import { gql } from "@apollo/client";

export const GET_ACTIVE_PROPOSALS = gql`
	{
		activeProposals(first: 5, where: { amount_not: 0 }) {
			id
			reciever
			amount
			proposalId
		}
	}
`;

export const GET_RECIEVED_FUNDS = gql`
	{
		recievedFunds(first: 5) {
			id
			from
			amount
			timestamp
		}
	}
`;

export const GET_EXECUTED_PROPOSALS = gql`
	{
		executedProposals(first: 5) {
			id
			reciever
			amount
			proposalId
		}
	}
`;
