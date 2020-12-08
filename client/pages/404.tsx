import * as React from 'react';
import { styled } from 'bumbag';
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
      <IMG src="404.svg" alt="" />
    </App>
  );
}
