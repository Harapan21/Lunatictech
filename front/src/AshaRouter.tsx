import * as React from 'react';
import { Route } from 'react-router-dom';
import Setup from './setup';
export default function AshaRouter() {
  return (
    <>
      <Route exact={true} path="/setup" component={Setup} />
    </>
  );
}
