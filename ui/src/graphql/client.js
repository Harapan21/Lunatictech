// apollo client
import ApolloClient from "apollo-boost";
import fetch from "isomorphic-unfetch";

if (!process.browser) {
  global.fetch = fetch;
}

export const client = new ApolloClient({
  uri: "http://localhost:8088/graphql"
});
