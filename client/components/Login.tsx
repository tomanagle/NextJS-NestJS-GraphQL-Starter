import * as React from 'react';
import { Heading } from 'bumbag';

import LoginButtons from 'components/LoginButtons';

function Login() {
  return (
    <>
      <Heading>Login</Heading>
      <p>
        You need to login or register with your GitHub or Reddit account to
        perform this action.
      </p>
      <LoginButtons />
    </>
  );
}

export default Login;
