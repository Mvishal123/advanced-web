# GraphQL

## What is GraphQL
- It is a query language.
- IT queries an API and not a database.
- It is not a database.
- GraphQL acts as a layer between the client and the server. 
    - There are 2 ways in which graphql can be used:
    1. Acts as a layer between the client and the server
        > CLIENT ----- GRAPHQL ----- BACKEND ----- DATABASE
    1. Used in the server
        > CLIENT ----- SERVER(GraphQL) ----- DATABASE

## Query and Mutation
- **Query**: GET
- **Mutation**: PUT, DELETE, POST


## Difference between graphql and REST API.
- There is only endpoint
    > /posts, /post/:id ❌
    /graphql ✅

- Overfetching/underfetching
    - In graphql, the frontend asks for what data it needs whereas in REST the backend gives the data and frontend can only send request to an endpoint. 
    