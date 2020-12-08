import React from 'react';
import { get } from 'lodash';
import { TopNav, Image, Button } from 'bumbag';
import Link from 'next/link';
import { useMeQuery } from 'generated';

function Navigation() {
  const { data } = useMeQuery();

  const me = get(data, 'me');

  return (
    <TopNav>
      <TopNav.Section>
        <TopNav.Item href="/" fontWeight="semibold">
          <Image src="/logo.png" height="44px" />
        </TopNav.Item>
      </TopNav.Section>
      <TopNav.Section marginRight="major-2">
        {me ? (
          <TopNav.Item>{me.name}</TopNav.Item>
        ) : (
          <>
            <TopNav.Item>
              <Link href="/auth/register" passHref>
                <Button variant="ghost" palette="primary" use="a">
                  Register
                </Button>
              </Link>
            </TopNav.Item>
            <TopNav.Item>
              <Link href="/auth/login" passHref>
                <Button palette="primary" use="a">
                  Login
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
