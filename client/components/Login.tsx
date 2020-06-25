import * as React from 'react';
import { Typography } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  .login-buttons-wrapper {
    button:nth-of-type(1) {
      margin-right: 1rem;
    }
  }
`;

import LoginButtons from 'components/LoginButtons';

function Login() {
  return (
    <Wrapper>
      <Typography.Title>Login</Typography.Title>
      <p>
        You need to login or register with your GitHub or Reddit account to
        perform this action.
      </p>
      <LoginButtons />
    </Wrapper>
  );
}

export default Login;
