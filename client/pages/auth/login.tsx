import * as React from 'react';
import LoginButtons from 'components/LoginButtons';
import App from 'components/App';

function LoginPage() {
  return (
    <App title="Login" description="">
      <LoginButtons />
    </App>
  );
}

export default LoginPage;
