import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {
  publicProfile,
  publicProfileVariables,
} from './__generated__/publicProfile';
import * as t from 'io-ts';
import { closeModalAction } from './Module';
// import R from 'ramda'

closeModalAction();

const GetUser = t.type({
  __typename: t.string,
  name: t.string,
});

const RootInterface = t.type({
  getUser: GetUser,
});

const query = gql`
  query publicProfile($id: String) {
    getUser(id: $id) {
      name
    }
  }
`;

const Hey: React.SFC<{ id?: string }> = ({
  id = 'bfeceC47dD8bf5F6264A9830A9d26ef387c38A67',
}) => (
  <Query<publicProfile, publicProfileVariables>
    query={query}
    variables={{ id }}
  >
    {props => {
      if (props.loading) {
        return <p>Loading</p>;
      }
      if (props.error) {
        // console.log(props.error);
        return <p>Oops</p>;
      }
      if (props.data) {
        const {
          getUser: { name },
        } = RootInterface.decode(props.data).getOrElseL(errors => {
          throw new Error(errors.join('\n'));
        });
        return <p>{name}</p>;
      }
    }}
  </Query>
);

export default Hey;
