const { gql } = require("apollo-server");
exports.typeDefs = gql`
  type Query {
    hello: String
    products(filters: ProductsFilterInput): [Product!]!
    product(id: ID!): Product
    categories: [Category!]
    category(id: ID!): Category
    reviews: [Review!]!
  }

  type Mutation {
    addCategory(input: AddCategoryInput!): Category
    addProduct(input: AddProductInput!): Product
    addReview(input: AddReviewInput!): Review
    deleteCategory(id: ID!): Category
  }

  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    category: Category
    reviews: [Review]
  }
  type Category {
    id: ID!
    name: String!
    products(filters: ProductsFilterInput): [Product!]!
  }
  type Review {
    id: ID!
    date: String
    title: String!
    comment: String!
    rating: Float!
    productId: ID!
  }

  input ProductsFilterInput {
    onSale: Boolean
    minimumRating: Int
  }

  input AddCategoryInput {
    name: String!
  }

  input AddProductInput {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
    categoryId: ID!
  }

  input AddReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productId: ID!
  }
`;
