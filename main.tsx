import * as React from 'react';
import * as ReactDOM from 'react-dom';
import AshaRouter from './src/AshaRouter';

const AshaRoot: React.FC = () => (
  <div>
    <AshaRouter />
  </div>
);

ReactDOM.render(<AshaRoot />, document.getElementById('asha'));
