import React from 'react';
import { Box } from 'bumbag';
import useTranslation from 'locales/useTranslation';
import FullPageLoading from 'components/FullPageLoading';
import { useGitHubAuthQuery } from 'generated';
import Error from 'components/Error';

const GitHubAuthContainer = ({ query }) => {
  const { t } = useTranslation();
  const { error } = useGitHubAuthQuery({
    ssr: false,
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

export default GitHubAuthContainer;
