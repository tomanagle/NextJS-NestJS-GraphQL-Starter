// THIS IS A GENERATED FILE, use `yarn codegen to regenerate
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type GetUserInput = {
  readonly userPermalink: Scalars['String'];
};

export type GitHubAuthInput = {
  readonly code?: Maybe<Scalars['String']>;
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly updateUser: User;
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly gitHubAuth: User;
  readonly redditAuth: User;
  readonly googleAuth: User;
  readonly getGoogleAuthURL: Scalars['String'];
  readonly users: ReadonlyArray<User>;
  readonly me?: Maybe<User>;
  readonly user?: Maybe<User>;
};


export type QueryGitHubAuthArgs = {
  input: GitHubAuthInput;
};


export type QueryRedditAuthArgs = {
  input: RedditAuthInput;
};


export type QueryGoogleAuthArgs = {
  input: RedditAuthInput;
};


export type QueryUserArgs = {
  input: GetUserInput;
};

export type RedditAuthInput = {
  readonly code?: Maybe<Scalars['String']>;
};

export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export type UpdateUserInput = {
  readonly email?: Maybe<Scalars['String']>;
  readonly name?: Maybe<Scalars['String']>;
  readonly bio?: Maybe<Scalars['String']>;
};

export type User = {
  readonly __typename?: 'User';
  readonly _id: Scalars['ID'];
  readonly email?: Maybe<Scalars['String']>;
  readonly name: Scalars['String'];
  readonly permalink: Scalars['String'];
  readonly active: Scalars['Boolean'];
  readonly githubId: Scalars['String'];
  readonly redditId: Scalars['String'];
  readonly avatar?: Maybe<Scalars['String']>;
  readonly bio?: Maybe<Scalars['String']>;
  readonly role: Roles;
};

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = (
  { readonly __typename?: 'Mutation' }
  & { readonly updateUser: (
    { readonly __typename?: 'User' }
    & Pick<User, '_id' | 'permalink' | 'name' | 'avatar' | 'bio'>
  ) }
);

export type GitHubAuthQueryVariables = Exact<{
  input: GitHubAuthInput;
}>;


export type GitHubAuthQuery = (
  { readonly __typename?: 'Query' }
  & { readonly gitHubAuth: (
    { readonly __typename?: 'User' }
    & Pick<User, '_id' | 'githubId'>
  ) }
);

export type RedditAuthQueryVariables = Exact<{
  input: RedditAuthInput;
}>;


export type RedditAuthQuery = (
  { readonly __typename?: 'Query' }
  & { readonly redditAuth: (
    { readonly __typename?: 'User' }
    & Pick<User, '_id' | 'redditId'>
  ) }
);

export type GoogleAuthQueryVariables = Exact<{
  input: RedditAuthInput;
}>;


export type GoogleAuthQuery = (
  { readonly __typename?: 'Query' }
  & { readonly googleAuth: (
    { readonly __typename?: 'User' }
    & Pick<User, '_id'>
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { readonly __typename?: 'Query' }
  & { readonly me?: Maybe<(
    { readonly __typename?: 'User' }
    & Pick<User, '_id' | 'name' | 'role' | 'permalink' | 'email' | 'avatar'>
  )> }
);

export type UserQueryVariables = Exact<{
  input: GetUserInput;
}>;


export type UserQuery = (
  { readonly __typename?: 'Query' }
  & { readonly user?: Maybe<(
    { readonly __typename?: 'User' }
    & Pick<User, '_id' | 'permalink' | 'name' | 'avatar' | 'bio'>
  )> }
);

export type GetGoogleAuthUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGoogleAuthUrlQuery = (
  { readonly __typename?: 'Query' }
  & Pick<Query, 'getGoogleAuthURL'>
);


export const UpdateUserDocument = gql`
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
export type UpdateUserMutationFn = ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;
export type UpdateUserComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUserMutation, UpdateUserMutationVariables>, 'mutation'>;

    export const UpdateUserComponent = (props: UpdateUserComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUserMutation, UpdateUserMutationVariables> mutation={UpdateUserDocument} {...props} />
    );
    
export type UpdateUserProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>
    } & TChildProps;
export function withUpdateUser<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateUserMutation,
  UpdateUserMutationVariables,
  UpdateUserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateUserMutation, UpdateUserMutationVariables, UpdateUserProps<TChildProps, TDataName>>(UpdateUserDocument, {
      alias: 'updateUser',
      ...operationOptions
    });
};

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = ApolloReactCommon.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GitHubAuthDocument = gql`
    query gitHubAuth($input: GitHubAuthInput!) {
  gitHubAuth(input: $input) {
    _id
    githubId
  }
}
    `;
export type GitHubAuthComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GitHubAuthQuery, GitHubAuthQueryVariables>, 'query'> & ({ variables: GitHubAuthQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GitHubAuthComponent = (props: GitHubAuthComponentProps) => (
      <ApolloReactComponents.Query<GitHubAuthQuery, GitHubAuthQueryVariables> query={GitHubAuthDocument} {...props} />
    );
    
export type GitHubAuthProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GitHubAuthQuery, GitHubAuthQueryVariables>
    } & TChildProps;
export function withGitHubAuth<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GitHubAuthQuery,
  GitHubAuthQueryVariables,
  GitHubAuthProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GitHubAuthQuery, GitHubAuthQueryVariables, GitHubAuthProps<TChildProps, TDataName>>(GitHubAuthDocument, {
      alias: 'gitHubAuth',
      ...operationOptions
    });
};

/**
 * __useGitHubAuthQuery__
 *
 * To run a query within a React component, call `useGitHubAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGitHubAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGitHubAuthQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGitHubAuthQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GitHubAuthQuery, GitHubAuthQueryVariables>) {
        return ApolloReactHooks.useQuery<GitHubAuthQuery, GitHubAuthQueryVariables>(GitHubAuthDocument, baseOptions);
      }
export function useGitHubAuthLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GitHubAuthQuery, GitHubAuthQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GitHubAuthQuery, GitHubAuthQueryVariables>(GitHubAuthDocument, baseOptions);
        }
export type GitHubAuthQueryHookResult = ReturnType<typeof useGitHubAuthQuery>;
export type GitHubAuthLazyQueryHookResult = ReturnType<typeof useGitHubAuthLazyQuery>;
export type GitHubAuthQueryResult = ApolloReactCommon.QueryResult<GitHubAuthQuery, GitHubAuthQueryVariables>;
export const RedditAuthDocument = gql`
    query redditAuth($input: RedditAuthInput!) {
  redditAuth(input: $input) {
    _id
    redditId
  }
}
    `;
export type RedditAuthComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<RedditAuthQuery, RedditAuthQueryVariables>, 'query'> & ({ variables: RedditAuthQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const RedditAuthComponent = (props: RedditAuthComponentProps) => (
      <ApolloReactComponents.Query<RedditAuthQuery, RedditAuthQueryVariables> query={RedditAuthDocument} {...props} />
    );
    
export type RedditAuthProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<RedditAuthQuery, RedditAuthQueryVariables>
    } & TChildProps;
export function withRedditAuth<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  RedditAuthQuery,
  RedditAuthQueryVariables,
  RedditAuthProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, RedditAuthQuery, RedditAuthQueryVariables, RedditAuthProps<TChildProps, TDataName>>(RedditAuthDocument, {
      alias: 'redditAuth',
      ...operationOptions
    });
};

/**
 * __useRedditAuthQuery__
 *
 * To run a query within a React component, call `useRedditAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useRedditAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRedditAuthQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRedditAuthQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RedditAuthQuery, RedditAuthQueryVariables>) {
        return ApolloReactHooks.useQuery<RedditAuthQuery, RedditAuthQueryVariables>(RedditAuthDocument, baseOptions);
      }
export function useRedditAuthLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RedditAuthQuery, RedditAuthQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RedditAuthQuery, RedditAuthQueryVariables>(RedditAuthDocument, baseOptions);
        }
export type RedditAuthQueryHookResult = ReturnType<typeof useRedditAuthQuery>;
export type RedditAuthLazyQueryHookResult = ReturnType<typeof useRedditAuthLazyQuery>;
export type RedditAuthQueryResult = ApolloReactCommon.QueryResult<RedditAuthQuery, RedditAuthQueryVariables>;
export const GoogleAuthDocument = gql`
    query googleAuth($input: RedditAuthInput!) {
  googleAuth(input: $input) {
    _id
  }
}
    `;
export type GoogleAuthComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GoogleAuthQuery, GoogleAuthQueryVariables>, 'query'> & ({ variables: GoogleAuthQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const GoogleAuthComponent = (props: GoogleAuthComponentProps) => (
      <ApolloReactComponents.Query<GoogleAuthQuery, GoogleAuthQueryVariables> query={GoogleAuthDocument} {...props} />
    );
    
export type GoogleAuthProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GoogleAuthQuery, GoogleAuthQueryVariables>
    } & TChildProps;
export function withGoogleAuth<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GoogleAuthQuery,
  GoogleAuthQueryVariables,
  GoogleAuthProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GoogleAuthQuery, GoogleAuthQueryVariables, GoogleAuthProps<TChildProps, TDataName>>(GoogleAuthDocument, {
      alias: 'googleAuth',
      ...operationOptions
    });
};

/**
 * __useGoogleAuthQuery__
 *
 * To run a query within a React component, call `useGoogleAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useGoogleAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGoogleAuthQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGoogleAuthQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GoogleAuthQuery, GoogleAuthQueryVariables>) {
        return ApolloReactHooks.useQuery<GoogleAuthQuery, GoogleAuthQueryVariables>(GoogleAuthDocument, baseOptions);
      }
export function useGoogleAuthLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GoogleAuthQuery, GoogleAuthQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GoogleAuthQuery, GoogleAuthQueryVariables>(GoogleAuthDocument, baseOptions);
        }
export type GoogleAuthQueryHookResult = ReturnType<typeof useGoogleAuthQuery>;
export type GoogleAuthLazyQueryHookResult = ReturnType<typeof useGoogleAuthLazyQuery>;
export type GoogleAuthQueryResult = ApolloReactCommon.QueryResult<GoogleAuthQuery, GoogleAuthQueryVariables>;
export const MeDocument = gql`
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
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    
export type MeProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<MeQuery, MeQueryVariables>
    } & TChildProps;
export function withMe<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeQuery,
  MeQueryVariables,
  MeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps, TDataName>>(MeDocument, {
      alias: 'me',
      ...operationOptions
    });
};

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const UserDocument = gql`
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
export type UserComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<UserQuery, UserQueryVariables>, 'query'> & ({ variables: UserQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const UserComponent = (props: UserComponentProps) => (
      <ApolloReactComponents.Query<UserQuery, UserQueryVariables> query={UserDocument} {...props} />
    );
    
export type UserProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<UserQuery, UserQueryVariables>
    } & TChildProps;
export function withUser<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UserQuery,
  UserQueryVariables,
  UserProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, UserQuery, UserQueryVariables, UserProps<TChildProps, TDataName>>(UserDocument, {
      alias: 'user',
      ...operationOptions
    });
};

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserQuery, UserQueryVariables>) {
        return ApolloReactHooks.useQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
      }
export function useUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, baseOptions);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = ApolloReactCommon.QueryResult<UserQuery, UserQueryVariables>;
export const GetGoogleAuthUrlDocument = gql`
    query getGoogleAuthURL {
  getGoogleAuthURL
}
    `;
export type GetGoogleAuthUrlComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>, 'query'>;

    export const GetGoogleAuthUrlComponent = (props: GetGoogleAuthUrlComponentProps) => (
      <ApolloReactComponents.Query<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables> query={GetGoogleAuthUrlDocument} {...props} />
    );
    
export type GetGoogleAuthUrlProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>
    } & TChildProps;
export function withGetGoogleAuthUrl<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  GetGoogleAuthUrlQuery,
  GetGoogleAuthUrlQueryVariables,
  GetGoogleAuthUrlProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables, GetGoogleAuthUrlProps<TChildProps, TDataName>>(GetGoogleAuthUrlDocument, {
      alias: 'getGoogleAuthUrl',
      ...operationOptions
    });
};

/**
 * __useGetGoogleAuthUrlQuery__
 *
 * To run a query within a React component, call `useGetGoogleAuthUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGoogleAuthUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGoogleAuthUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGoogleAuthUrlQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>) {
        return ApolloReactHooks.useQuery<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>(GetGoogleAuthUrlDocument, baseOptions);
      }
export function useGetGoogleAuthUrlLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>(GetGoogleAuthUrlDocument, baseOptions);
        }
export type GetGoogleAuthUrlQueryHookResult = ReturnType<typeof useGetGoogleAuthUrlQuery>;
export type GetGoogleAuthUrlLazyQueryHookResult = ReturnType<typeof useGetGoogleAuthUrlLazyQuery>;
export type GetGoogleAuthUrlQueryResult = ApolloReactCommon.QueryResult<GetGoogleAuthUrlQuery, GetGoogleAuthUrlQueryVariables>;