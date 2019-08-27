import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Layout from './src/Layout/Layout';
import Sidebar from './src/Layout/Sidebar';
import Content from './src/Layout/Content';
import Login from './src/Login';
import Register from './src/Register';
import { ApolloProvider } from '@apollo/react-hooks';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import ApolloClient from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
const SmileApp: React.FC = () => {
  const [token, setTokenStoreage] = React.useState(
    localStorage.getItem('token')
  );
  React.useEffect(() => {
    localStorage.setItem('token', token);
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
          console.log(user);
          return (
            <>
              {isLogin && <Sidebar />}
              <Content isLogin={isLogin} active={active}>
                <Login switcher={switcher} handleLogin={handleLogin} />
                <Register switcher={switcher} handleLogin={handleLogin} />
                <div>Dashboard</div>
              </Content>
            </>
          );
        }}
      </Layout>
    </ApolloProvider>
  );
};

ReactDOM.render(<SmileApp />, document.getElementById('smile'));
