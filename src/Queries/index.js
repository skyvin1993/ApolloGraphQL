import { gql } from 'apollo-boost';

export const GET_MESSAGES = gql`
query GetMsgs($page: Int!) {
    messages(page:$page per_page: 4){
        list {
            id
            mobile_message
        }
    }
}
`

export const AUTH_INFO = gql`
query AuthInfo{
    auth_info{
        account{
          login
          small_avatar
          orders_statistics{
            rating
          }
        }
    }  
}
`

export const ORDERS = gql`
query Orders($category: String!){
    orders(page: 1 category:$category){
        list{
          id
          status
          status_color
          name
          favorite
          subject
          customer{
            id
            login
            small_avatar
            profile_link
            date_registration
            date_last_visit
          }
        }
      }
}   
`