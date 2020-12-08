import * as React from 'react';
import { get } from 'lodash';
import { Button, Tooltip, Text } from 'bumbag';
import { useRouter } from 'next/router';
import { useGetGoogleAuthUrlQuery } from 'generated';

function GoogleLoginLink({ text = 'Login with Google', redirect = '/' }) {
  const { data } = useGetGoogleAuthUrlQuery();
  const href = get(data, 'getGoogleAuthURL', '');

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
      <Tooltip content="Login or register with your Google account">
        <Button
          variant="ghost"
          width="100%"
          onClick={handleClick}
          iconBefore="b-google"
          iconBeforeProps={{
            color: 'primary'
          }}
        >
          <Text color="primary">{text}</Text>
        </Button>
      </Tooltip>
    </>
  );
}

export default GoogleLoginLink;
