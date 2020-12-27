import React from 'react';
import useTranslation from 'locales/useTranslation';
import { Box } from 'bumbag';
import FullPageLoading from 'components/FullPageLoading';
import { useRedditAuthQuery } from 'generated';
import Error from 'components/Error';

const RedditAuthContainer = ({ query }) => {
  const { t } = useTranslation();
  const { data, error } = useRedditAuthQuery({
    onCompleted: () => {
      window.close();
    },
    variables: { input: { code: query.code } }
  });

  if (!query.code) {
    return (
      <Box>
        <Error error={t('page.github.errors.missingCode')} />
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

export default RedditAuthContainer;
