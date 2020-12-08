import * as React from 'react';
import dynamic from 'next/dynamic';
import FullPageLoading from 'components/FullPageLoading';

const DynamicGitHubAuth = dynamic(() => import('containers/login/GitHubAuth'), {
  ssr: false,
  loading: () => <FullPageLoading />
});

function LoginPage({ query }) {
  return <DynamicGitHubAuth query={query} />;
}

export default LoginPage;
