import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AshaRouter from './src/AshaRouter';
import Layout from './src/Layout';
import { ApolloProvider } from '@apollo/react-hooks';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          // tslint:disable-next-line:no-console
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        );
      }
      if (networkError) {
        // tslint:disable-next-line:no-console
        console.log(`[Network error]: ${networkError}`);
      }
    }),
    createUploadLink({
      uri: 'http://localhost:4000'
    })
  ]),
  cache: new InMemoryCache()
});
const AshaRoot: React.FC = () => (
  <ApolloProvider client={client}>
    <Layout>
      <AshaRouter />
    </Layout>
  </ApolloProvider>
);

ReactDOM.render(<AshaRoot />, document.getElementById('smile'));
