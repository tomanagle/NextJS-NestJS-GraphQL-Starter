import * as React from 'react';
import styled from 'styled-components';
import { Formik, Form as _FormikForm } from 'formik';

const FormikForm = styled(_FormikForm)`
  label {
    font-weight: 500;
    font-size: 1rem;
    color: #333;
  }

  .ant-row.ant-form-item {
    flex-direction: column;
    margin-bottom: 1.25rem;
  }
  .ant-col.ant-form-item-label {
    text-align: left;
  }

  .medium-width {
    max-width: 37.5rem;
    width: 100%;
  }
`;

export const FormikContext = React.createContext({});

function FormWrapper(props) {
  return (
    <Formik
      {...props}
      validationSchema={props.validationSchema}
      onSubmit={props.onSubmit}
      initialValues={props.initialValues}
    >
      {bag => {
        return (
          <FormikContext.Provider value={bag}>
            <FormikForm method="POST">{props.children}</FormikForm>
          </FormikContext.Provider>
        );
      }}
    </Formik>
  );
}

function FormikWithConsumer(props) {
  const { children, ...rest } = props;

  return (
    <FormWrapper {...rest}>
      <FormikContext.Consumer>{children}</FormikContext.Consumer>
    </FormWrapper>
  );
}

export default FormikWithConsumer;
