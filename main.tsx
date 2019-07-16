import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AshaRouter from './src/AshaRouter';
import Layout from './src/Layout';

const AshaRoot: React.FC = () => (
  <Layout>
    <AshaRouter />
  </Layout>
);

ReactDOM.render(<AshaRoot />, document.getElementById('smile'));
