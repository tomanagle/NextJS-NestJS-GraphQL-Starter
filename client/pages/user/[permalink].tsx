import * as React from 'react';
import { get } from 'lodash';
import Error from 'next/error';
import { getDataFromTree } from '@apollo/client/react/ssr';
import { Box, Heading, Text } from 'bumbag';
import App from 'components/App';
import { useUserQuery } from 'generated';
import withApollo from 'lib/withApollo';
import { NextPageContext } from 'next';

function UserProfilePage(props: NextPageContext) {
  const { data, loading, error } = useUserQuery({
    variables: { input: { userPermalink: get(props, 'query.permalink', '') } }
  });

  const user = get(data, 'user', null);

  if ((!loading && !user) || error) {
    return <Error statusCode={404} />;
  }

  if (loading) {
    return <div>loading,..,s</div>;
  }

  return (
    <App
      title={loading ? '' : user.name}
      description=""
      breadcrumbs={[
        {
          label: user.name
        }
      ]}
    >
      <Box use="header">
        <Heading>{user.name}</Heading>
        <Text>{user.bio}</Text>
      </Box>
    </App>
  );
}

export default withApollo(UserProfilePage, { getDataFromTree });
