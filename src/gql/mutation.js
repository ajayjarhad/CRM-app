import { gql } from "@apollo/client";

export const ADD_NOTE = gql`
  mutation updateCustomerMutation($_id: ID!, $notes: [CustomerNoteInput!]!) {
    updateCustomer(_id: $_id, input: { notes: $notes }) {
      _id
      createdAt
      updatedAt
      name
      email
      phone
      company
      notes {
        description
      }
    }
  }
`;

export const ADD_DEAL = gql`
  mutation updateDealsMutation($_id: ID!, $deals: [ID!]!) {
    updateDeal(_id: $_id, input: { deals: $deals }) {
      title
      amount
      dealOwner
      deals {
        _id
        name
        company
        phone
        email
      }
    }
  }
`;
