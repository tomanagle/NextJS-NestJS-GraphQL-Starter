import React from 'react';
import { Box } from 'bumbag';
import useTranslation from 'locales/useTranslation';
import FullPageLoading from 'components/FullPageLoading';
import { useGoogleAuthQuery } from 'generated';
import Error from 'components/Error';

const GoogleAuthContainer = ({ query }) => {
  const { t } = useTranslation();
  const { error } = useGoogleAuthQuery({
    onCompleted: () => {
      window.close();
    },
    variables: { input: { code: query.code } }
  });

  if (!query.code) {
    return (
      <Box>
        <Error error={t('page.google.errors.missingCode')} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Error error={error} />
      </Box>
    );
  }

  return (
    <Box>
      <FullPageLoading />
    </Box>
  );
};

export default GoogleAuthContainer;
