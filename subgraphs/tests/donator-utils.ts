import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  FundsRecieved,
  ProposalApproved,
  ProposalCreated,
  ProposalExecuted,
  ProposalRejected,
  ProposalVoted
} from "../generated/Donator/Donator"

export function createFundsRecievedEvent(
  from: Address,
  amount: BigInt,
  timestamp: BigInt
): FundsRecieved {
  let fundsRecievedEvent = changetype<FundsRecieved>(newMockEvent())

  fundsRecievedEvent.parameters = new Array()

  fundsRecievedEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  fundsRecievedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  fundsRecievedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return fundsRecievedEvent
}

export function createProposalApprovedEvent(
  proposalId: BigInt,
  donationAddress: Address,
  amount: BigInt
): ProposalApproved {
  let proposalApprovedEvent = changetype<ProposalApproved>(newMockEvent())

  proposalApprovedEvent.parameters = new Array()

  proposalApprovedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  proposalApprovedEvent.parameters.push(
    new ethereum.EventParam(
      "donationAddress",
      ethereum.Value.fromAddress(donationAddress)
    )
  )
  proposalApprovedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return proposalApprovedEvent
}

export function createProposalCreatedEvent(
  proposalId: BigInt,
  proposer: Address,
  donationAddress: Address,
  donationReason: string,
  amount: BigInt
): ProposalCreated {
  let proposalCreatedEvent = changetype<ProposalCreated>(newMockEvent())

  proposalCreatedEvent.parameters = new Array()

  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "donationAddress",
      ethereum.Value.fromAddress(donationAddress)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "donationReason",
      ethereum.Value.fromString(donationReason)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return proposalCreatedEvent
}

export function createProposalExecutedEvent(
  proposalId: BigInt,
  donationAddress: Address,
  amount: BigInt
): ProposalExecuted {
  let proposalExecutedEvent = changetype<ProposalExecuted>(newMockEvent())

  proposalExecutedEvent.parameters = new Array()

  proposalExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  proposalExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "donationAddress",
      ethereum.Value.fromAddress(donationAddress)
    )
  )
  proposalExecutedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return proposalExecutedEvent
}

export function createProposalRejectedEvent(
  proposalId: BigInt,
  donationAddress: Address,
  amount: BigInt
): ProposalRejected {
  let proposalRejectedEvent = changetype<ProposalRejected>(newMockEvent())

  proposalRejectedEvent.parameters = new Array()

  proposalRejectedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  proposalRejectedEvent.parameters.push(
    new ethereum.EventParam(
      "donationAddress",
      ethereum.Value.fromAddress(donationAddress)
    )
  )
  proposalRejectedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return proposalRejectedEvent
}

export function createProposalVotedEvent(
  proposalId: BigInt,
  voter: Address,
  vote: boolean
): ProposalVoted {
  let proposalVotedEvent = changetype<ProposalVoted>(newMockEvent())

  proposalVotedEvent.parameters = new Array()

  proposalVotedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromUnsignedBigInt(proposalId)
    )
  )
  proposalVotedEvent.parameters.push(
    new ethereum.EventParam("voter", ethereum.Value.fromAddress(voter))
  )
  proposalVotedEvent.parameters.push(
    new ethereum.EventParam("vote", ethereum.Value.fromBoolean(vote))
  )

  return proposalVotedEvent
}
