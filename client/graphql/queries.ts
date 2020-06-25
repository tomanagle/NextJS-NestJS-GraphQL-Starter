// @ts-nocheck
import gql from 'graphql-tag';

export const GITHUB_LOGIN_QUERY = gql`
  query gitHubAuth($input: GitHubAuthInput!) {
    gitHubAuth(input: $input) {
      _id
      githubId
    }
  }
`;

export const REDDIT_LOGIN_QUERY = gql`
  query redditAuth($input: RedditAuthInput!) {
    redditAuth(input: $input) {
      _id
      redditId
    }
  }
`;

export const ME_QUERY = gql`
  query me {
    me {
      _id
      name
      role
      permalink
      email
      avatar
    }
  }
`;

export const GET_USER_QUERY = gql`
  query user($input: GetUserInput!) {
    user(input: $input) {
      _id
      permalink
      name
      avatar
      bio
    }
  }
`;
