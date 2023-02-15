import { BigInt } from "@graphprotocol/graph-ts";
import {
	FundsRecieved,
	ProposalApproved,
	ProposalCreated,
	ProposalExecuted,
	ProposalRejected,
} from "../generated/Donator/Donator";
import {
	ActiveProposal,
	CancelledProposal,
	ExecutedProposal,
	RecievedFund,
} from "../generated/schema";

export function handleFundsRecieved(event: FundsRecieved): void {

	let recievedFunds = RecievedFund.load(getIdFromEventParams(event.params.timestamp))
	if(!recievedFunds){
		recievedFunds=new RecievedFund(getIdFromEventParams(event.params.timestamp))
	}
	recievedFunds.amount=event.params.amount
	recievedFunds.from=event.params.from
	recievedFunds.timestamp=event.params.timestamp

	recievedFunds.save()

}

export function handleProposalApproved(event: ProposalApproved): void {

	let approvedProposal = ExecutedProposal.load(getIdFromEventParams(event.params.proposalId))
	let activeProposal=ActiveProposal.load(getIdFromEventParams(event.params.proposalId))
	if(!approvedProposal){
		approvedProposal = new ExecutedProposal(getIdFromEventParams(event.params.proposalId))
	}

	approvedProposal.amount=event.params.amount
	approvedProposal.proposalId=event.params.proposalId
	approvedProposal.reciever=event.params.donationAddress

	activeProposal!.amount=BigInt.fromString("0")

	approvedProposal.save()
	activeProposal!.save()	

}

export function handleProposalCreated(event: ProposalCreated): void {

	let activeProposal=ActiveProposal.load(getIdFromEventParams(event.params.proposalId))

	if(!activeProposal) {
		activeProposal = new ActiveProposal(getIdFromEventParams(event.params.proposalId))
	}

	activeProposal.amount=event.params.amount
	activeProposal.proposalId=event.params.proposalId
	activeProposal.reciever=event.params.donationAddress

	activeProposal.save()

}

export function handleProposalExecuted(event: ProposalExecuted): void {

	let executedProposal = ExecutedProposal.load(getIdFromEventParams(event.params.proposalId))
	let activeProposal=ActiveProposal.load(getIdFromEventParams(event.params.proposalId))
	if(!executedProposal){
		executedProposal = new ExecutedProposal(getIdFromEventParams(event.params.proposalId))
	}

	executedProposal.amount=event.params.amount
	executedProposal.proposalId=event.params.proposalId
	executedProposal.reciever=event.params.donationAddress

	activeProposal!.amount=BigInt.fromString("0")

	executedProposal.save()
	activeProposal!.save()

}

export function handleProposalRejected(event: ProposalRejected): void {

	let cancelledProposal = CancelledProposal.load(getIdFromEventParams(event.params.proposalId))
	let activeProposal=ActiveProposal.load(getIdFromEventParams(event.params.proposalId))
	if(!cancelledProposal){
		cancelledProposal = new CancelledProposal(getIdFromEventParams(event.params.proposalId))
	}

	cancelledProposal.amount=event.params.amount
	cancelledProposal.proposalId=event.params.proposalId
	cancelledProposal.reciever=event.params.donationAddress

	activeProposal!.amount=BigInt.fromString("0")

	cancelledProposal.save()
	activeProposal!.save()

}

function getIdFromEventParams(proposalId:BigInt):string{
	return proposalId.toHexString();
}
