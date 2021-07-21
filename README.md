# Propertymart


How to install django backend
--
1) add the django secret key and mapbox key in path variables
2) create a virtual environment
3) activate it
4) Run pip install -r requirements.txt 

#Graphql queery
--
```
{
  allUsers{
    id
    username
    email
    password
    lastLogin
    isStaff
    isActive
    isSuperuser
    firstName
    dateJoined
  }
}

{
  user(id:6){
    username
    email
    savedhousesSet {
      id
      favourites{
        title
        city
        description
        area
        address
        bedrooms
        bathrooms
        price
        location
        
      }
    }
  }
}
```
##Mutations
--
```
mutation {
  createUser(email: "test@abv.bg", password: "test", username: "ivo") {
    user {
      id
      email
      username
    }
  }
}

mutation TokenAuth($username: String!, $password: String!) {
  tokenAuth(username: $username, password: $password) {
    token
    payload
    refreshExpiresIn
  }
}

mutation VerifyToken($token: String!) {
  verifyToken(token: $token) {
    payload
  }
}

mutation createHouse($address: String!, $area: String!, $bathrooms: Int!, $bedrooms: Int!, $builtOn: Date!, $description: String!, $floors: Int!, $location: String!, $price: Float!, $title: String!) {
  createHouse(address: $address, area: $area, bathrooms: $bathrooms, bedrooms: $bedrooms, builtOn: $builtOn, description: $description, floors: $floors, location: $location, price: $price, title: $title) {
    house {
      title
    }
  }
}

{
  "address": "street test",
  "area": "13333 sqrt feet",
  "bathrooms":2,
  "bedrooms":3,
  "built_on":"2020-03-03",
  "description":"test",
  "floors":2,
  "location":"22.000,25.0000",
  "price":72000,
  "title":"TITLE"
}

{
  
  "Authorization": "JWT dbmFtZSI6InNrYXp1IiwiZXhwIjoxdsadsadsaxOTE0NTU0fQ.F-zz3cC0BGiGsddsaFeMEkcmaw1CyUKol-_Q"
}

mutation changeUser($firstName: String, $lastName: String,$phone:String,$userId:Int!) {
  changeUser(firstName: $firstName, lastName: $lastName,phone:$phone,userId:$userId) {
  user{id,lastName,firstName}
  }
}

mutation{
	saveHouse(houseId:3){
    user{
      id
      username
      email
    }
    house{
      id
      title
      price
      address
      bathrooms
      bedrooms
    }
  }
}
```
