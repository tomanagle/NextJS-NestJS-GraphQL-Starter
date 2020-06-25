import { Alert } from 'antd';
const Error = ({ error }) => {
  return (
    <Alert
      message={error.message.replace('GraphQL error: ', '')}
      type="error"
    />
  );
};

export default Error;
