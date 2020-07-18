import * as React from 'react';
import GitHubLogin from 'components/auth/GitHubLogin';
import RedditLogin from 'components/auth/RedditLogin';
import GoogleLogin from 'components/auth/GoogleLogin';
import styled from 'styled-components';
import Paragraph from 'antd/lib/skeleton/Paragraph';
import { Typography } from 'antd';

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

function LoginButtons() {
  return (
    <Wrapper className="login-buttons-wrapper">
      <Typography.Text>Login with one of the following:</Typography.Text>
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
