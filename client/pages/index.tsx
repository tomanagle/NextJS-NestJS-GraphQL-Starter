import * as React from 'react';
import { get } from 'lodash';
import { Typography } from 'antd';
import App from 'components/App';
import PostsContainer from 'containers/Posts';
import { useMeQuery } from 'generated';
import LoggedOutHome from 'containers/LoggedOutHome';

const Home = () => {
  const { data } = useMeQuery();
  const me = get(data, 'me', null);

  return (
    <App description="">{me ? `Welcome ${me.name}` : 'You are logged out'}</App>
  );
};

export default Home;
