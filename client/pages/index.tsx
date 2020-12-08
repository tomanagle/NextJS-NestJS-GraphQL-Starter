import * as React from 'react';
import { get } from 'lodash';
import App from 'components/App';
import { useMeQuery } from 'generated';
import LoggedOutHome from 'containers/LoggedOutHome';

const Home = () => {
  const { data } = useMeQuery();
  const me = get(data, 'me', null);

  return (
    <App description="">{me ? `Welcome ${me.name}` : <LoggedOutHome />}</App>
  );
};

export default Home;
