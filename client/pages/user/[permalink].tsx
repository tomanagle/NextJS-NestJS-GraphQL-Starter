import * as React from 'react';
import { get } from 'lodash';
import Error from 'next/error';
import { styled } from 'bumbag';
import App from 'components/App';
import ListPosts from 'containers/Posts';
import { useUserQuery } from 'generated';

const Header = styled.header`
  h1 {
    margin-bottom: 0;
  }
`;

function UserProfilePage({ query: { permalink } }) {
  const { data, loading, error } = useUserQuery({
    variables: { input: { userPermalink: permalink } }
  });

  const user = get(data, 'user', null);

  if ((!loading && !user) || error) {
    return (
      <App title="Not found" description="">
        <Error statusCode={404} />
      </App>
    );
  }

  return (
    <App
      title={loading ? '' : user.name}
      description=""
      breadcrumbs={
        loading
          ? []
          : [
              {
                label: user.name
              }
            ]
      }
    >
      <Header>
        <Row align="middle" justify="start">
          {loading ? (
            <Skeleton avatar />
          ) : (
            <>
              <Col span={24}>
                <Row gutter={[80, 0]}>
                  <Col span={2}>
                    <Avatar
                      size={64}
                      src={user.avatar}
                      alt={user.name + ' avatar'}
                    />
                  </Col>

                  <Col>
                    <Typography.Title level={1}>{user.name}</Typography.Title>
                    {user.bio && <p>{user.bio}</p>}
                  </Col>
                </Row>
              </Col>
            </>
          )}
        </Row>
      </Header>
      <Divider />
      {loading ? (
        <Skeleton />
      ) : (
        <ListPosts user={user._id} showFilters={false} loading={loading} />
      )}
    </App>
  );
}

export default UserProfilePage;
