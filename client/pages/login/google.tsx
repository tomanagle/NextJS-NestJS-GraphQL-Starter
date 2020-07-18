import * as React from 'react';
import dynamic from 'next/dynamic';
import FullPageLoading from 'components/FullPageLoading';

const Container = dynamic(() => import('containers/login/GoogleAuth'), {
  ssr: false,
  loading: () => <FullPageLoading />
});

function LoginPage({ query }) {
  return <Container query={query} />;
}

export default LoginPage;
