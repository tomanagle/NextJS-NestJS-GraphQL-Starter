import React from 'react';
import gql from 'graphql-tag';
import { styled } from 'bumbag';
import FullPageLoading from 'components/FullPageLoading';
import { useGitHubAuthQuery } from 'generated';
import Error from 'components/Error';

const Wrapper = styled.div``;

const GitHubAuthContainer = ({ query }) => {
  const { data, error } = useGitHubAuthQuery({
    onCompleted: () => {
      window.close();
    },
    variables: { input: { code: query.code } }
  });

  if (error) {
    return (
      <Wrapper>
        <Error error={error} />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <FullPageLoading />
    </Wrapper>
  );
};

export default GitHubAuthContainer;
