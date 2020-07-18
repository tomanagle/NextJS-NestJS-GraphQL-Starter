import * as React from 'react';
import { get } from 'lodash';
import { GoogleOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import { useGetGoogleAuthUrlQuery } from 'generated';

function GoogleLoginLink({ text = 'Login with Google' }) {
  const { data } = useGetGoogleAuthUrlQuery();
  const href = get(data, 'getGoogleAuthURL', '');
  const router = useRouter();

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
        type="ghost"
        style={{ backgroundColor: '#4185f3', color: '#fff' }}
        onClick={handleClick}
        icon={<GoogleOutlined style={{ fontSize: '18px' }} />}
      >
        <span className="social-login-wrapper__text">{text}</span>
      </Button>
    </Tooltip>
  );
}

export default GoogleLoginLink;
