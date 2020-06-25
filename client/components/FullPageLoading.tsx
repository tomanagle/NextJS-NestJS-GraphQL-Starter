import React from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #fff;
  top: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  align-content: center;
  .ant-spin.ant-spin-spinning {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const FullPageLoading = () => {
  return (
    <Wrapper>
      <Spin size="large" />
    </Wrapper>
  );
};

export default FullPageLoading;
