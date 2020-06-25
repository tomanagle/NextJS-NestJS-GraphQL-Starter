import React from 'react';
import { Row, Col } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 2.5rem;
  background-color: #fff;
  width: 100%;
  max-width: 42.5rem;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    padding: 1.25rem;
  }
`;

const PageContainer = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default PageContainer;
