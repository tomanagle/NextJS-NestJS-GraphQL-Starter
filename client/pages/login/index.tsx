import * as React from 'react';
import { get } from 'lodash';
import { useRouter } from 'next/router';
import LoginButtons from 'components/LoginButtons';
import App from 'components/App';
import styled from 'styled-components';
import { useMeQuery } from 'generated';
import FullPageLoading from 'components/FullPageLoading';

function LoginPage() {
  const router = useRouter();

  const { data, loading } = useMeQuery();

  const me = get(data, 'me', null);

  // React.useEffect(() => {
  //   if (me) {
  //     router.push('/');
  //   }
  // });

  // if (loading) {
  //   return (
  //     <App title="Login" description="">
  //       <FullPageLoading />
  //     </App>
  //   );
  // }

  return (
    <App title="Login" description="">
      <LoginButtons />
    </App>
  );
}

export default LoginPage;
