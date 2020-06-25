import * as React from 'react';
import { Result, Button } from 'antd';
import styled from 'styled-components';
import App from 'components/App';
import Link from 'next/link';

const IMG = styled.img`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

export default function Custom404() {
  return (
    <App title="Not found" description="">
      <Result
        icon={<IMG src="404.svg" alt="" />}
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Link href="/" as="/" passHref>
            <Button type="link">Home</Button>
          </Link>
        }
      />
    </App>
  );
}
