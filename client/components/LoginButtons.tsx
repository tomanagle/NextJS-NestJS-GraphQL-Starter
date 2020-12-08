import * as React from 'react';
import GitHubLogin from 'components/auth/GitHubLogin';
import RedditLogin from 'components/auth/RedditLogin';
import GoogleLogin from 'components/auth/GoogleLogin';
import { styled, Heading } from 'bumbag';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 20rem;
  height: 100%;
  margin: 0 auto;

  padding: 1rem;
  border: solid 1px #333;
  border-radius: 0.5rem;
`;

function LoginButtons({ heading = 'Login with one of the following:' }) {
  return (
    <Wrapper className="login-buttons-wrapper">
      <Heading fontSize="400">{heading}</Heading>
      <br />
      <GitHubLogin />
      <br />
      <RedditLogin />
      <br />
      <GoogleLogin />
    </Wrapper>
  );
}

export default LoginButtons;
