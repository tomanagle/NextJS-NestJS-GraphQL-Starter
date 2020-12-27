import * as React from 'react';
import { get } from 'lodash';
import { getDataFromTree } from '@apollo/client/react/ssr';
import App from 'components/App';
import { useMeQuery } from 'generated';
import LoggedOutHome from 'containers/LoggedOutHome';
import withApollo from 'lib/withApollo';

const Home = () => {
  const { data } = useMeQuery();
  const me = get(data, 'me', null);

  return (
    <App description="">{me ? `Welcome ${me.name}` : <LoggedOutHome />}</App>
  );
};

export default withApollo(Home, { getDataFromTree });
