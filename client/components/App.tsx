import React from 'react';
import { get } from 'lodash';
import { NextSeo, BreadcrumbJsonLd } from 'next-seo';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { PageWithHeader, Breadcrumb, Box, useTheme } from 'bumbag';
import { useMeQuery } from 'generated';
import { CLIENT_DOMAIN } from 'config/env';
import manifest from 'public/manifest.json';
import Login from 'components/Login';
import Navigation from 'components/Navigation';
import Footer from 'components/Footer';
import useTranslation from 'locales/useTranslation';

const pagePadding = 'major-2';

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
      <Breadcrumb padding={pagePadding}>
        <Breadcrumb.Item>
          <Link href="/" as="/" passHref>
            <Breadcrumb.Link>Home</Breadcrumb.Link>
          </Link>
        </Breadcrumb.Item>
        {(breadcrumbs || []).map((bc: BreadcrumbItem, index) => {
          return (
            <Breadcrumb.Item
              key={`breadcrumb_${bc.label}_${bc.as}`}
              isCurrent={breadcrumbs.length - 1 === index}
            >
              {bc.href && bc.as ? (
                <Link href={bc.href} as={bc.as} passHref>
                  <Breadcrumb.Link>{bc.label}</Breadcrumb.Link>
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
  const { t } = useTranslation();
  const { theme } = useTheme();
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
    <>
      <NextSeo
        title={
          title ? `${title} | ${t('global.siteTitle')}` : t('global.siteTitle')
        }
        description={description}
        canonical={`${CLIENT_DOMAIN}${asPath}`}
        openGraph={{
          ...profile,
          locale: 'en_IE',
          url: `${CLIENT_DOMAIN}${asPath}`,
          title: title
            ? `${title} | ${t('global.siteTitle')}`
            : t('global.siteTitle'),
          description,
          site_name: t('global.siteTitle'),
          images
        }}
        twitter={{
          handle: t('global.twitterHandle'),
          cardType: 'summary_large_image'
        }}
      />

      <Head>
        <link rel="icon" href="/f.ico" />
        <meta name="description" content={description} />
        <link rel="shortcut icon" href="/f.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content={theme.palette.primary} />
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <PageWithHeader header={<Navigation />} border="default">
        {requiresUser && !me ? (
          <Login />
        ) : (
          <>
            <RenderBreadcrumbs breadcrumbs={breadcrumbs} asPath={asPath} />
            <Box use="main" flex="1" padding={pagePadding}>
              {children}
            </Box>

            {showFooter && <Footer pagePadding={pagePadding} />}
          </>
        )}
      </PageWithHeader>
    </>
  );
};

export default App;
