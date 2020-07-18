import React from 'react';
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
import { SettingOutlined } from '@ant-design/icons';

function LoggedInNavigation({ me }) {
  return (
    <React.Fragment key="logged-in-extra-menu">
      <Dropdown
        key="logged-in-extra-menu__dropdown"
        overlay={
          <Menu>
            <Menu.Item key="app-menu-item-1_key-2">
              <Link key="app-link-1_key-2" href="/profile" as="/profile">
                <a>
                  <SettingOutlined /> Profile
                </a>
              </Link>
            </Menu.Item>
          </Menu>
        }
      >
        <Button
          icon={
            <Avatar size="small" src={me.avatar} alt={`${me.name} avatar`} />
          }
        >
          Menu
        </Button>
      </Dropdown>
    </React.Fragment>
  );
}

export default LoggedInNavigation;
