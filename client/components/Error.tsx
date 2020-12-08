import { Alert } from 'bumbag';

const Error = ({ error }) => {
  return (
    <Alert type="danger"> {error.message.replace('GraphQL error: ', '')}</Alert>
  );
};

export default Error;
