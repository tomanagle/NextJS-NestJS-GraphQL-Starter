import React from 'react';
import { get } from 'lodash';
import { TopNav, Image, Button, DropdownMenu, Link as BBLink } from 'bumbag';
import Link from 'next/link';
import useTranslation from 'locales/useTranslation';
import { useMeQuery, useLogoutMutation } from 'generated';
import { ME_QUERY } from '../graphql/queries';

function Dropdown() {
  const { t } = useTranslation();

  const [logout, { loading: loggingOut }] = useLogoutMutation({
    optimisticResponse: {
      logout: null
    },
    update(cache) {
      cache.writeQuery({
        query: ME_QUERY,
        data: {
          me: null
        }
      });
    }
  });
  return (
    <DropdownMenu
      menu={
        <>
          <DropdownMenu.Item iconBefore="solid-pen">
            <Link href="/profile" passHref>
              <BBLink width="100%" display="block" textAlign="center">
                {t('navigation.profile')}
              </BBLink>
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Button
              width="100%"
              variant="ghost"
              onClick={() => logout()}
              isLoading={loggingOut}
            >
              {t('navigation.logout')}
            </Button>
          </DropdownMenu.Item>
        </>
      }
    >
      <Button iconAfter="chevron-down">{t('navigation.dropdown')}</Button>
    </DropdownMenu>
  );
}

function Navigation() {
  const { t } = useTranslation();
  const { data } = useMeQuery();

  const me = get(data, 'me');

  return (
    <TopNav>
      <TopNav.Section>
        <Link href="/" passHref>
          <TopNav.Item href="/" fontWeight="semibold">
            <Image src="/logo.png" height="44px" />
          </TopNav.Item>
        </Link>
      </TopNav.Section>
      <TopNav.Section marginRight="major-2">
        {me ? (
          <TopNav.Item>
            <Dropdown />
          </TopNav.Item>
        ) : (
          <>
            <TopNav.Item>
              <Link href="/auth/register" passHref>
                <Button variant="ghost" palette="primary" use="a">
                  {t('navigation.register')}
                </Button>
              </Link>
            </TopNav.Item>
            <TopNav.Item>
              <Link href="/auth/login" passHref>
                <Button palette="primary" use="a">
                  {t('navigation.login')}
                </Button>
              </Link>
            </TopNav.Item>
          </>
        )}
      </TopNav.Section>
    </TopNav>
  );
}

export default Navigation;
