import React from 'react';
import gql from 'graphql-tag';
import { styled } from 'bumbag';
import FullPageLoading from 'components/FullPageLoading';
import { useRedditAuthQuery } from 'generated';
import Error from 'components/Error';

const Wrapper = styled.div``;

const RedditAuthContainer = ({ query }) => {
  const { data, error } = useRedditAuthQuery({
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

export default RedditAuthContainer;
