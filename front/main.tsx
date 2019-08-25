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
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';

import reducer from './src/redux/reducer';

import { createStore, applyMiddleware } from 'redux';
// tslint:disable-next-line:no-implicit-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
const token = localStorage.getItem('token');
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
      uri: 'http://localhost:4000/graphql',
      headers: {
        token: token ? token : ''
      }
    })
  ]),
  cache: new InMemoryCache()
});
const AshaRoot: React.FC = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Layout>
        <AshaRouter />
      </Layout>
    </Provider>
  </ApolloProvider>
);

ReactDOM.render(<AshaRoot />, document.getElementById('smile'));
