// @ts-nocheck
import gql from 'graphql-tag';

export const GITHUB_LOGIN_QUERY = gql`
  query gitHubAuth($input: SocialAuthInput!) {
    gitHubAuth(input: $input) {
      _id
      githubId
    }
  }
`;

export const REDDIT_LOGIN_QUERY = gql`
  query redditAuth($input: SocialAuthInput!) {
    redditAuth(input: $input) {
      _id
      redditId
    }
  }
`;

export const GOOGLE_LOGIN_QUERY = gql`
  query googleAuth($input: SocialAuthInput!) {
    googleAuth(input: $input) {
      _id
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

export const GET_GOOGLE_LOG_LINK = gql`
  query getGoogleAuthURL {
    getGoogleAuthURL
  }
`;
