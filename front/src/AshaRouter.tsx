import * as React from 'react';
import { Route } from 'react-router-dom';
import Setup from './setup';
import Dashboard from './dashboard';
export default function AshaRouter() {
  return (
    <>
      <Route exact={true} path="/setup" component={Setup} />
      <Route
        exact={true}
        path="/"
        render={({ history }: any) => {
          const token = localStorage.getItem('token');
          if (token) {
            return <Dashboard />;
          }
          history.push('/login');
          return;
        }}
      />
    </>
  );
}
