import { gql } from 'apollo-boost';

export const ADD_FAVOR = gql`
mutation AddFavor($orderID: ID!){
    add_favorit_order(order_id: $orderID){
      order {
        id
      }
    }
}
`

export const REMOVE_FAVOR = gql`
mutation RemoveFavor($orderID: ID!){
    remove_favorit_order(order_id: $orderID){
      order {
        id
      }
    }
  }
`