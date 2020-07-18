import React from 'react';
import { get } from 'lodash';
import { NextSeo, BreadcrumbJsonLd } from 'next-seo';
import {
  PageHeader as _PageHeader,
  Layout as _Layout,
  Button,
  Breadcrumb as _Breadcrumb,
  Menu,
  Dropdown,
  Avatar
} from 'antd';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { PlusOutlined, SettingOutlined, BookOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useMeQuery } from 'generated';
import LoginButtons from 'components/LoginButtons';
import { CLIENT_DOMAIN, SITE_NAME, TWITTER_HANDLE } from 'config/env';
import manifest from 'public/manifest.json';
import Login from 'components/Login';
import LoggedOutNavigation from 'components/LoggedOutNavigation';
import LoggedInNavigation from 'components/LoggedInNavigation';
const { Header: _Header, Footer: _Footer, Content: _Content } = _Layout;

const PageHeader = styled(_PageHeader)`
  -webkit-box-shadow: inset 0 -1px 0 rgba(100, 121, 143, 0.122);
  box-shadow: inset 0 -1px 0 rgba(100, 121, 143, 0.122);

  .ant-page-header-heading {
    align-items: center;
    display: flex;
  }
  .ant-page-header-heading-extra {
    margin-left: auto;
  }

  .page-header__logo {
    height: 1.5rem;
    width: auto;
  }

  @media screen and (max-width: 768px) {
    span.ant-page-header-heading-extra {
      width: auto;
      padding-top: 0;
    }
  }
`;

const Layout = styled(_Layout)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled(_Header)`
  border-bottom: solid 1px #ccc;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: auto;
  height: auto;
  .site-page-header {
    background-color: #fff;
  }

  h1 {
    margin: 0;
  }
`;

const Content = styled(_Content)`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: ${props =>
    props.theme.large_spacing + ' ' + props.theme.large_spacing};
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0%;

  /* @media screen and (max-width: 599px) {
    padding: 5px 5px;
  } */
`;

const Footer = styled(_Footer)`
  padding: ${props =>
    props.theme.large_spacing + ' ' + props.theme.large_spacing};
  background-color: rgba(256, 256, 256, 0.8);
  position: relative;
  z-index: 3;

  a,
  button {
    margin-right: 1.25rem;
  }
`;

const Breadcrumb = styled(_Breadcrumb)`
  padding: ${props =>
    props.theme.small_spacing + ' ' + props.theme.large_spacing};
`;

const RenderBreadcrumbs = ({ breadcrumbs, asPath }) => {
  if (!breadcrumbs.length) {
    return null;
  }

  return (
    <>
      <BreadcrumbJsonLd
        itemListElements={[
          {
            label: 'Home',
            as: '/'
          },
          ...breadcrumbs
        ].map((bc, i) => {
          return {
            position: i + 1,
            name: bc.label,
            item: `${CLIENT_DOMAIN}${bc.as ? bc.as : asPath}`
          };
        })}
      />
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link href="/" as="/">
            <a>Home</a>
          </Link>
        </Breadcrumb.Item>
        {(breadcrumbs || []).map((bc: BreadcrumbItem) => {
          return (
            <Breadcrumb.Item key={`breadcrumb_${bc.label}_${bc.as}`}>
              {bc.href && bc.as ? (
                <Link href={bc.href} as={bc.as}>
                  <a>{bc.label}</a>
                </Link>
              ) : (
                bc.label
              )}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export interface BreadcrumbItem {
  label: string;
  href?: string;
  as?: string;
}

export interface Profile {
  username: string;
}

const App = ({
  children,
  title,
  description,
  showFooter = true,
  showNav = true,
  breadcrumbs = [],
  profile,
  requiresUser = false
}: {
  children: any;
  title?: string;
  description: string;
  showFooter?: boolean;
  showNav?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  profile?: Profile;
  requiresUser?: boolean;
}) => {
  const { data: meData } = useMeQuery();
  const me = get(meData, 'me');
  const router = useRouter();
  const asPath = get(router, 'asPath', '');

  const images = manifest.icons.map(icon => {
    const sizes = icon.sizes.split('x');
    return {
      url: `${CLIENT_DOMAIN}${icon.src}`,
      width: parseInt(sizes[0], 10),
      height: parseInt(sizes[1], 10),
      alt: `Icon ${icon.sizes}`
    };
  });

  return (
    <Layout>
      <NextSeo
        title={title ? `${title} | ${SITE_NAME}` : SITE_NAME}
        description={description}
        canonical={`${CLIENT_DOMAIN}${asPath}`}
        openGraph={{
          ...profile,
          locale: 'en_IE',
          url: `${CLIENT_DOMAIN}${asPath}`,
          title: title ? `${title} | ${SITE_NAME}` : SITE_NAME,
          description,
          site_name: SITE_NAME,
          images
        }}
        twitter={{
          handle: `${TWITTER_HANDLE}`,
          cardType: 'summary_large_image'
        }}
      />

      <Head>
        <link rel="icon" href="/f.ico" />
        <meta name="description" content={description} />
        <link rel="shortcut icon" href="/f.ico" />
      </Head>
      {showNav && (
        <Header>
          <PageHeader
            className="site-page-header"
            title={
              <Link href="/" as="/">
                <a title="Home">
                  <img
                    src="/logo.png"
                    alt={`${SITE_NAME} logo`}
                    className="page-header__logo"
                  />
                </a>
              </Link>
            }
            extra={[
              me ? <LoggedInNavigation me={me} /> : <LoggedOutNavigation />
            ]}
          />

          <RenderBreadcrumbs asPath={asPath} breadcrumbs={breadcrumbs} />
        </Header>
      )}
      <Content className="app__content">
        {requiresUser && !me ? <Login /> : children}
      </Content>
      {showFooter && <Footer className="app__footer">Footer</Footer>}
    </Layout>
  );
};

export default App;
