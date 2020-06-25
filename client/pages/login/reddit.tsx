import * as React from 'react';
import dynamic from 'next/dynamic';
import FullPageLoading from 'components/FullPageLoading';

const DynamicRedditAuthContainer = dynamic(
  () => import('containers/login/RedditAuth'),
  { ssr: false, loading: () => <FullPageLoading /> }
);

function LoginPage({ query }) {
  return <DynamicRedditAuthContainer query={query} />;
}

export default LoginPage;
