import React from 'react';
import { styled } from 'bumbag';
import FullPageLoading from 'components/FullPageLoading';
import { useGoogleAuthQuery } from 'generated';
import Error from 'components/Error';

const Wrapper = styled.div``;

const GoogleAuthContainer = ({ query }) => {
  const { data, error } = useGoogleAuthQuery({
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

export default GoogleAuthContainer;
