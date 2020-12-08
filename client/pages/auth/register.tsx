import * as React from 'react';
import LoginButtons from 'components/LoginButtons';
import App from 'components/App';

function RegisterPage() {
  return (
    <App title="Register" description="">
      <LoginButtons heading="Register" />
    </App>
  );
}

export default RegisterPage;
