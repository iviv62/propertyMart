import {gql} from '@apollo/client';

export const ALL_HOUSES = gql`
  {
    allHouses {
      id
      title
      description
      floors
      builtOn
      area
      bedrooms
      bathrooms
      price
      address
      location
      city
      createdOn
      postedBy {
        id
        firstName
        lastName
        phone
        email
      }
      otherImages {
        id
        image
      }
      savedhousesSet{
        user{
          id
        }
      }
    }
  }
`;

export const GET_HOUSE=gql`
  query($id:Int!){
  house(id:$id){
  		id
      title
      description
      floors
      builtOn
      area
      bedrooms
      bathrooms
      price
      address
      location
      city
      createdOn
      postedBy {
        id
        firstName
        lastName
        phone
        email
      }
      otherImages {
        id
        image
      }
      savedhousesSet{
        user{
          id
      }
	}
 }
}`


export const CREATE_USER = gql`
  mutation createUser($email: String!, $password: String!, $username: String!) {
    createUser(email: $email, password: $password, username: $username) {
      user {
        id
        email
        username
      }
    }
  }
`;

export const SAVED_HOUSES_OF_USER = gql`
{
  savedHousesOfUser{
    id
    house{
      id
      title
      description
      floors
      builtOn
      area
      bedrooms
      bathrooms
      price
      address
      location
      city
      createdOn
      postedBy{
        id
        firstName
        lastName
        email
        phone
      }
      otherImages{
        id
        image
      }
      
    }
  }
}
`;

export const SAVE_HOUSE = gql`
mutation saveHouse($houseId: Int!) {
  saveHouse(houseId: $houseId) {
    savedHouse {
      id
      user {
        id
      }
      house {
        id
        title
        description
        floors
        builtOn
        area
        bedrooms
        bathrooms
        price
        address
        location
        city
        createdOn
        postedBy {
          firstName
          lastName
          email
          phone
        }
        otherImages {
          id
          image
        }
      }
    }
  }
}
`;

export const DELETE_SAVED_HOUSE = gql`
mutation deleteSavedHouse($houseId: Int!) {
  deleteSavedHouse(houseId: $houseId) {
   savedId
  }
}
`;

export const TOKEN_AUTHENTICATION = gql`
  mutation TokenAuth($username: String!, $password: String!) {
    tokenAuth(input: {username: $username, password: $password}) {
      token
      payload
      refreshExpiresIn
      user {
        id
        email
        phone
        firstName
        lastName
        username
      }
    }
  }
`;

export const DELETE_USER=gql`
mutation($userId:Int!){
  deleteUser(userId:$userId){
    userId
  }
}
`;

export const GET_USER=gql`
  query($id:Int!){
    user(id:$id){
      id
      username
      email
      phone
      firstName
      lastName
    }
  }
`
export const UPDATE_USER_DATA = gql`
mutation($userId:Int!,$firstName:String,$phone:String,$lastName:String,$email:String){
  updateUser(userId:$userId,firstName:$firstName,phone:$phone,lastName:$lastName,email:$email){
    user{
      id
      email
      phone
      firstName
      lastName
    }
  }
}`

export const CREATE_PROPERTY = gql`
mutation createHouse($title:String!,$description:String!,$floors:Int!,$builtOn:Date!,$area:String!,$bedrooms:Int!,$bathrooms:Int!,$price:Float!,$address:String!,$location:[Float]!,$city:String!){
  createHouse(title:$title,description:$description,floors:$floors,builtOn:$builtOn,area:$area,bedrooms:$bedrooms,bathrooms:$bathrooms,price:$price,address:$address,location:$location,city:$city){
    house{
      title
      location
      floors
      bathrooms
     	id
      description
      builtOn
      area
      bedrooms
      address
      city
      
    }
  }
}
`


