import React from 'react';
import { compose } from 'react-apollo';
import withData from '../lib/with-data';
import App from '../layouts/App';
import Test from '../components/connections/Test';

class TypescriptTest extends React.Component<{}> {
  render() {
    return (
      <App>
        <Test />
      </App>
    );
  }
}

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData
)(TypescriptTest);
