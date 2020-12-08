import * as React from 'react';
import { Button, Tooltip, Text } from 'bumbag';
import { useRouter } from 'next/router';
import { CLIENT_DOMAIN, REDDIT_CLIENT_ID } from '../../config/env';

const GitHubLogin = ({
  text = 'Login with Reddit',
  redirect = '/'
}: {
  text?: string;
  redirect?: string;
}) => {
  const TYPE = 'code';
  const SCOPE_STRING = 'identity';

  const RANDOM_STRING = Math.random()
    .toString(36)
    .substring(7);
  const DURATION = 'temporary';

  const REDIRECT_URI = `${CLIENT_DOMAIN}/auth/reddit`;

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
        window.location.replace(redirect);
        reloaded = true;
      }
    }, 100);
  }

  return (
    <>
      <Tooltip content="Login or register with your Reddit account">
        <Button
          width="100%"
          variant="ghost"
          onClick={handleClick}
          iconBefore="b-reddit"
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
