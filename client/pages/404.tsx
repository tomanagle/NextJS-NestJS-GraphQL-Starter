import * as React from 'react';
import { Image, Flex, Text, Button, Heading } from 'bumbag';
import App from 'components/App';
import Link from 'next/link';
import useTranslation from 'locales/useTranslation';

export default function Custom404() {
  const { t } = useTranslation();

  return (
    <App title="Not found" description="">
      <Flex alignItems="center" flexDirection="column">
        <Heading fontSize="500" marginTop="major-2" marginBottom="major-2">
          {t('page.notFound.body')}
        </Heading>
        <Image maxWidth="42.5rem" src="404.svg" alt="" />

        <Link href="/" passHref>
          <Button use="a">{t('page.notFound.callToAction')}</Button>
        </Link>
      </Flex>
    </App>
  );
}
