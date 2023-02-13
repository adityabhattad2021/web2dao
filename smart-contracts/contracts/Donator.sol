// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";

// TODO: Add a NFT gated function to vote for a proposal and create a proposal.

contract Donator is AutomationCompatibleInterface {

    using Counters for Counters.Counter;
    using EnumerableSet for EnumerableSet.AddressSet;

    event ProposalCreated(
        uint proposalId,
        address proposer,
        address donationAddress,
        string donationReason,
        uint amount
    );
    event ProposalVoted(uint proposalId, address voter, bool vote);
    event ProposalExecuted(
        uint proposalId,
        address donationAddress,
        uint amount
    );
    event ProposalRejected(
        uint proposalId,
        address donationAddress,
        uint amount
    );
    event ProposalApproved(
        uint proposalId,
        address donationAddress,
        uint amount
    );
    event FundsRecieved(address from, uint amount, uint timestamp);

    

    struct RecievedFunds {
        address from;
        uint amount;
        uint timestamp;
    }
    mapping(address => RecievedFunds[]) private recievedFunds;

    // Proposal status
    Counters.Counter private proposalCounter;
    struct Proposal {
        uint id;
        address proposer;
        address donationAddress;
        string donationReason;
        uint amount;
        uint yesVotes;
        uint noVotes;
        uint status;
        uint256 votingEndTime;
    }
    mapping(uint => Proposal) private proposals;
    mapping(uint => EnumerableSet.AddressSet) private proposalIdToVoters;

    // Proposal status
    enum ProposalStatus {
        Pending, // 0
        Approved, // 1
        Rejected, // 2
        Executed // 3
    }

    function proposeDonation(
        address _donationAddress,
        string memory donationReason,
        uint _amount
    ) public {
        require(_donationAddress != address(0), "Donation address cannot be 0");
        require(_amount > 0, "Donation amount must be greater than 0");
        require(
            bytes(donationReason).length > 0,
            "Donation reason cannot be empty"
        );
        require(
            bytes(donationReason).length <= 100,
            "Donation reason cannot be longer than 100 characters"
        );

        // Create a new proposal
        uint proposalId = proposalCounter.current();
        Proposal storage proposal = proposals[proposalId];
        proposal.id = proposalId;
        proposal.proposer = msg.sender;
        proposal.donationAddress = _donationAddress;
        proposal.donationReason = donationReason;
        proposal.amount = _amount;
        proposal.yesVotes = 0;
        proposal.noVotes = 0;
        proposal.status = uint(ProposalStatus.Pending);
        proposal.votingEndTime = block.timestamp + 2 minutes;
        proposalCounter.increment();

        emit ProposalCreated(
            proposalId,
            msg.sender,
            _donationAddress,
            donationReason,
            _amount
        );
    }

    function voteForProposal(uint _proposalId) public {
        require(
            _proposalId < proposalCounter.current(),
            "Proposal does not exist"
        );
        require(
            proposals[_proposalId].status == uint(ProposalStatus.Pending),
            "Proposal voting ended"
        );
        require(
            proposals[_proposalId].proposer != msg.sender,
            "Proposer cannot vote for their own proposal"
        );
        require(
            proposals[_proposalId].votingEndTime > block.timestamp,
            "Proposal voting ended"
        );
        require(
            !proposalIdToVoters[_proposalId].contains(msg.sender),
            "You have already voted for this proposal"
        );
        proposals[_proposalId].yesVotes += 1;

        // Add voter to proposal
        proposalIdToVoters[_proposalId].add(msg.sender);

        emit ProposalVoted(_proposalId, msg.sender, true);
    }

    function executeProposal(uint _proposalId) internal {
        require(
            _proposalId < proposalCounter.current(),
            "Proposal does not exist"
        );
        require(
            proposals[_proposalId].status == uint(ProposalStatus.Approved),
            "Proposal is not approved"
        );

        (bool success, ) = proposals[_proposalId].donationAddress.call{
            value: proposals[_proposalId].amount
        }("");
        require(success, "Transfer failed.");
        Proposal storage proposal = proposals[_proposalId];
        proposal.status = uint(ProposalStatus.Executed);
        emit ProposalExecuted(
            _proposalId,
            proposals[_proposalId].donationAddress,
            proposals[_proposalId].amount
        );
    }

    function fundTheSmartContractInWEI() public payable {
        require(msg.value > 0, "You must send some Ether");
        recievedFunds[msg.sender].push(
            RecievedFunds(msg.sender, msg.value, block.timestamp)
        );
        emit FundsRecieved(msg.sender, msg.value, block.timestamp);
    }

    // Chainlink Keeper
    function checkUpkeep(
        bytes memory /* checkData */
    ) public override returns (bool, bytes memory) {
        bool upkeepNeeded = false;
        for (uint i = 0; i < proposalCounter.current(); i++) {
            uint proposalStatus = uint(getProposalStatus(i));
            if (proposalStatus == uint(ProposalStatus.Approved)) {
                upkeepNeeded = true;
                return (upkeepNeeded, "");
            }
        }
        return (upkeepNeeded, "");
    }

    function performUpkeep(bytes memory /* performData */) external override {
        (bool upkeepNeeded, ) = checkUpkeep("");
        require(upkeepNeeded, "No upkeep needed");
        for (uint i = 0; i < proposalCounter.current(); i++) {
            uint proposalStatus = uint(getProposalStatus(i));
            if (proposalStatus == uint(ProposalStatus.Approved)) {
                executeProposal(i);
            }
        }
    }

    function getProposal(
        uint _proposalId
    )
        public
        view
        returns (
            address _donationAddress,
            string memory donationReason,
            uint _amount
        )
    {
        return (
            proposals[_proposalId].donationAddress,
            proposals[_proposalId].donationReason,
            proposals[_proposalId].amount
        );
    }

    function getProposalVotes(
        uint _proposalId
    ) public view returns (uint _yesVotes, uint _noVotes) {
        return (
            proposals[_proposalId].yesVotes,
            proposals[_proposalId].noVotes
        );
    }

    function getProposalStatus(uint _proposalId) public returns (uint _status) {
        if (proposals[_proposalId].votingEndTime < block.timestamp) {
            if (
                proposals[_proposalId].yesVotes > proposals[_proposalId].noVotes
            ) {
                Proposal storage proposal = proposals[_proposalId];
                proposal.status = uint(ProposalStatus.Approved);
                emit ProposalApproved(
                    _proposalId,
                    proposals[_proposalId].donationAddress,
                    proposals[_proposalId].amount
                );
                return proposal.status;
            } else {
                Proposal storage proposal = proposals[_proposalId];
                proposal.status = uint(ProposalStatus.Rejected);
                emit ProposalRejected(
                    _proposalId,
                    proposals[_proposalId].donationAddress,
                    proposals[_proposalId].amount
                );
                return proposal.status;

            }
        } else {
            return proposals[_proposalId].status;
        }
    }

    // what happens if some one sends this contract ETH without calling fund function.
    receive() external payable {
        fundTheSmartContractInWEI();
    }

    fallback() external payable {
        fundTheSmartContractInWEI();
    }
}
