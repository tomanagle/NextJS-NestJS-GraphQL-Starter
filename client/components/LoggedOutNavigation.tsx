import * as React from 'react';
import {
  PageHeader as _PageHeader,
  Layout as _Layout,
  Button,
  Breadcrumb as _Breadcrumb,
  Menu,
  Dropdown,
  Avatar
} from 'antd';
import Link from 'next/link';

import {
  PlusOutlined,
  SettingOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';

function LoggedOutNavigation() {
  return (
    <React.Fragment key="logged-out-extra-menu">
      <Link key="app-link-2_key-0" href="/login" as="/login">
        <a>Login</a>
      </Link>

      <Link key="app-link-2_key-1" href="/register" as="/register" passHref>
        <Button type="primary">
          Register <ArrowRightOutlined />
        </Button>
      </Link>
    </React.Fragment>
  );
}

export default LoggedOutNavigation;
