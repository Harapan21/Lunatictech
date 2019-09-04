import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Layout from './src/Layout/Layout';
import Content from './src/Layout/Content';
import Login from './src/Login';
import Register from './src/Register';
import Dashboard from './src/Dashboard';
import { ApolloProvider } from '@apollo/react-hooks';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';

const SmileApp: React.SFC = () => {
  const [token, setTokenStoreage] = React.useState(
    localStorage.getItem('token')
  );

  React.useEffect(() => {
    localStorage.setItem('token', token as string);
  }, [token]);

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
  return (
    <ApolloProvider client={client}>
      <Layout>
        {({
          isLogin,
          active,
          switcher,
          handleLayoutState,
          user
        }: ChildrenLayoutProps) => {
          const handleLogin = ({ token, login }: any) => {
            setTokenStoreage(token);
            handleLayoutState({
              isLogin: login
            });
          };
          return (
            <>
              <Content isLogin={isLogin} active={active} defaultActive={2}>
                <Login switcher={switcher} handleLogin={handleLogin} />
                <Register switcher={switcher} handleLogin={handleLogin} />
                {isLogin && <Dashboard user={user} />}
              </Content>
            </>
          );
        }}
      </Layout>
    </ApolloProvider>
  );
};

ReactDOM.render(<SmileApp />, document.getElementById('smile'));
