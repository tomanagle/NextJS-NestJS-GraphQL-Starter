import * as React from 'react';
import { get } from 'lodash';
import { Button, Tooltip, Text } from 'bumbag';
import { useRouter } from 'next/router';
import { GITHUB_CLIENT_ID, CLIENT_DOMAIN } from '../../config/env';

const GitHubLogin = ({ text = 'Login with GitHub', redirect = '/' }) => {
  const router = useRouter();
  const asPath = get(router, 'asPath', '/');

  const href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email&redirect_uri=${CLIENT_DOMAIN}/auth/github?redirect=${asPath}`;

  let checkConnect;
  let win;
  let reloaded = false;
  function handleClick() {
    win = window.open(
      href,
      '_blank',
      'location=yes,height=570,width=520,scrollbars=yes,status=yes'
    );

    checkConnect = setInterval(function() {
      if (!win || !win.closed) return;
      clearInterval(checkConnect);
      if (!reloaded) {
        window.location.replace(redirect);
        reloaded = true;
      }
    }, 100);
  }

  return (
    <>
      <Tooltip content="Login or register with your GitHub account">
        <Button
          width="100%"
          variant="ghost"
          onClick={handleClick}
          iconBefore="b-github"
          iconBeforeProps={{
            color: 'primary'
          }}
        >
          <Text color="primary">{text}</Text>
        </Button>
      </Tooltip>
    </>
  );
};

export default GitHubLogin;
