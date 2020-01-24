// apollo client
import ApolloClient from "apollo-boost";
import fetch from "isomorphic-unfetch";
import query_gql from "./query";

if (!process.browser) {
  global.fetch = fetch;
}

export { query_gql };
const client = new ApolloClient({
  uri: "http://localhost:8088/graphql"
});
export default client;
