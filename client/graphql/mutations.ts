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
