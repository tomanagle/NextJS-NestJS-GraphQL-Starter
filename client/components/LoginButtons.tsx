import * as React from 'react';
import { Flex, Heading, Columns } from 'bumbag';
import GitHubLogin from 'components/auth/GitHubLogin';
import RedditLogin from 'components/auth/RedditLogin';
import GoogleLogin from 'components/auth/GoogleLogin';

import useTranslation from 'locales/useTranslation';

function LoginButtons() {
  const { t } = useTranslation();

  return (
    <Columns>
      <Columns.Column spread={3} spreadOffset="both">
        <Flex flexDirection="column">
          <Heading fontSize="400">{t('page.login.heading')}</Heading>
          <br />
          <GitHubLogin />
          <br />
          <RedditLogin />
          <br />
          <GoogleLogin />
        </Flex>
      </Columns.Column>
    </Columns>
  );
}

export default LoginButtons;
