import { gql } from "@apollo/client";
export const GET_CUSTOMERS = gql`
  query {
    customers {
      name
      _id
      createdAt
      updatedAt
      email
      phone
      company
      labels
      notes {
        description
      }
    }
  }
`;

export const GET_DEALS = gql`
  query {
    deals {
      _id
      createdAt
      updatedAt
      title
      amount
      dealOwner
      deals {
        _id
        createdAt
        updatedAt
        name
      }
    }
  }
`;
