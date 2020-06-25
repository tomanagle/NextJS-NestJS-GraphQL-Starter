import * as React from 'react';
import { get } from 'lodash';
import { GithubOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { GITHUB_CLIENT_ID, CLIENT_DOMAIN } from 'config/env';

const GitHubLogin = ({ text = 'GitHub login' }: { text?: string }) => {
  const router = useRouter();
  const asPath = get(router, 'asPath', '/');

  const href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user:email&redirect_uri=${CLIENT_DOMAIN}/login/github?redirect=${asPath}`;

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
        window.location.reload();
        reloaded = true;
      }
    }, 100);
  }

  return (
    <Tooltip title="Login or register with your GitHub account">
      <Button
        type="primary"
        onClick={handleClick}
        icon={<GithubOutlined style={{ fontSize: '18px' }} />}
      >
        <span className="social-login-wrapper__text">{text}</span>
      </Button>
    </Tooltip>
  );
};

export default GitHubLogin;
