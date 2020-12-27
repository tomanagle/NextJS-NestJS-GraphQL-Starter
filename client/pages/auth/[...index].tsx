import React from 'react';
import { get } from 'lodash';
import dynamic from 'next/dynamic';
import LoginButtons from 'components/LoginButtons';
import FullPageLoading from 'components/FullPageLoading';
import App from 'components/App';
import withApollo from 'lib/withApollo';
import useTranslation from 'locales/useTranslation';

const GitHubAuthContainer = dynamic(
  () => import('containers/auth/GitHubAuth'),
  {
    ssr: false,
    loading: () => <FullPageLoading />
  }
);

const GoogleAuthContainer = dynamic(
  () => import('containers/auth/GoogleAuth'),
  {
    ssr: false,
    loading: () => <FullPageLoading />
  }
);

const RedditAuthContainer = dynamic(
  () => import('containers/auth/RedditAuth'),
  { ssr: false, loading: () => <FullPageLoading /> }
);

// Add pages to the this config object
const pages: {
  [index: string]: {
    title: string;
    description: string;
    Container: any;
    showNav?: boolean;
  };
} = {
  login: {
    title: 'page.login.title',
    description: 'page.login.description',
    Container: LoginButtons
  },
  register: {
    title: 'page.register.title',
    description: 'page.register.description',
    Container: LoginButtons
  },
  github: {
    title: 'page.github.title',
    description: 'page.github.description',
    Container: GitHubAuthContainer,
    showNav: false
  },
  google: {
    title: 'page.google.title',
    description: 'page.google.description',
    Container: GoogleAuthContainer,
    showNav: false
  },
  reddit: {
    title: 'page.reddit.title',
    description: 'page.reddit.description',
    Container: RedditAuthContainer,
    showNav: false
  }
};

function AuthPage({ query }) {
  const { t } = useTranslation();
  const [page] = get(query, 'index', [null]);

  const { Container, title, showNav = true } = pages[page];

  return (
    <App showNav={showNav} title={t(title)} description="">
      <Container query={query} />
    </App>
  );
}

export default withApollo(AuthPage);
