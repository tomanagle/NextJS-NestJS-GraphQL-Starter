import gql from 'graphql-tag';

export const UPDATE_USER_MUTATION = gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      _id
      permalink
      name
      avatar
      bio
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation logout {
    logout {
      _id
      permalink
      name
      avatar
      bio
    }
  }
`;
