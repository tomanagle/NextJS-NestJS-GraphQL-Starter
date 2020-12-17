import * as React from 'react';
import { get } from 'lodash';
import Error from 'next/error';
import { Box, Heading, Text } from 'bumbag';
import App from 'components/App';
import { useUserQuery } from 'generated';

function UserProfilePage({ query: { permalink } }) {
  const { data, loading, error } = useUserQuery({
    variables: { input: { userPermalink: permalink } }
  });

  const user = get(data, 'user', null);

  if ((!loading && !user) || error) {
    return <Error statusCode={404} />;
  }

  if (loading) {
    return <p>Loading...</p>;
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

export default UserProfilePage;
