import { Alert } from 'bumbag';
import { get } from 'lodash';

const Error = ({ error }) => {
  const message = typeof error === 'string' ? error : get(error, 'message', '');

  return <Alert type="danger"> {message.replace('GraphQL error: ', '')}</Alert>;
};

export default Error;
