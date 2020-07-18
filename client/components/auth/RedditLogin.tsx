import * as React from 'react';
import { RedditOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { CLIENT_DOMAIN, REDDIT_CLIENT_ID } from 'config/env';

const GitHubLogin = ({ text = 'Reddit login' }: { text?: string }) => {
  const TYPE = 'code';
  const SCOPE_STRING = 'identity';

  const RANDOM_STRING = Math.random()
    .toString(36)
    .substring(7);
  const DURATION = 'temporary';

  const REDIRECT_URI = `${CLIENT_DOMAIN}/login/reddit`;

  const href = `https://www.reddit.com/api/v1/authorize?client_id=${REDDIT_CLIENT_ID}&response_type=${TYPE}&state=${RANDOM_STRING}&redirect_uri=${REDIRECT_URI}&duration=${DURATION}&scope=${SCOPE_STRING}`;

  let reloaded = false;
  let checkConnect;
  let win;
  function handleClick() {
    win = window.open(
      href,
      '_blank',
      'location=yes,height=620,width=832,scrollbars=yes,status=yes'
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
    <Tooltip title="Login or register with your Reddit account">
      <Button
        type="ghost"
        style={{ backgroundColor: '#ff4500', color: '#fff' }}
        onClick={handleClick}
        icon={<RedditOutlined style={{ fontSize: '18px' }} />}
      >
        <span className="social-login-wrapper__text">{text}</span>
      </Button>
    </Tooltip>
  );
};

export default GitHubLogin;
