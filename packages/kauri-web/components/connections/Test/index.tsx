import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { publicProfile } from './__generated__/publicProfile';
import * as t from 'io-ts';
// import R from 'ramda'

const GetMyProfile = t.type({
  __typename: t.string,
  username: t.string,
});

const RootInterface = t.type({
  getMyProfile: GetMyProfile,
});

const query = gql`
  query publicProfile {
    getMyProfile {
      username
    }
  }
`;

const Hey: React.SFC<{ id?: string }> = ({
  id = '0xbfeceC47dD8bf5F6264A9830A9d26ef387c38A67',
}) => (
  <Query<publicProfile> query={query} variables={{ id }}>
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
          getMyProfile: { username },
        } = RootInterface.decode(props.data).getOrElseL(errors => {
          // console.error(JSON.stringify(errors));
          throw new Error(errors.join('\n'));
        });
        return <p>{username}</p>;
      }
    }}
  </Query>
);

export default Hey;
