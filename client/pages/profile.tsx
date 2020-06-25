import * as React from 'react';
import { get, isEqual, omit } from 'lodash';
import * as Yup from 'yup';
import emailValidator from 'email-validator';
import { useMeQuery, useUpdateUserMutation } from 'generated';
import { Input, Button, Skeleton, Form, message, Alert } from 'antd';
import { Field } from 'formik';
import FormWrapper from 'components/FormWrapper';
import App from 'components/App';
import Error from 'components/Error';

function SettingsPage() {
  const { data: meData, loading } = useMeQuery();
  const me = get(meData, 'me', null);

  const [updateUser, { loading: updating, error }] = useUpdateUserMutation({
    onCompleted: () => {
      message.success('Successfully updated profile');
    }
  });

  const initialValues = me
    ? {
        email: me.email,
        name: me.name,
        bio: me.bio || ''
      }
    : {};

  function valuesHaveChanged({ initialValues, currentValues }) {
    return !isEqual(initialValues, currentValues);
  }

  function handleSubmit(values) {
    if (
      !valuesHaveChanged({
        initialValues,
        currentValues: omit(values, 'emailDisabled')
      })
    ) {
      return;
    }
    return updateUser({
      variables: {
        input: {
          email: values.email,
          name: values.name,
          bio: values.bio
        }
      }
    });
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Must be a valid email address')
      .required('Email is required')
      .nullable(),
    name: Yup.string().required('Email is required'),
    bio: Yup.string()
  });

  return (
    <App
      title="Profile"
      description=""
      breadcrumbs={[{ label: 'Profile' }]}
      requiresUser
    >
      {loading || !me ? (
        <Skeleton />
      ) : (
        <FormWrapper
          validationSchema={validationSchema}
          onSubmit={v => handleSubmit(v)}
          initialValues={{
            ...initialValues,
            emailDisabled: emailValidator.validate(me.email)
          }}
        >
          {({ errors, setFieldValue, values }) => {
            return (
              <>
                {error && <Error error={error} />}
                <Form.Item
                  className="medium-width"
                  label="Name"
                  required
                  hasFeedback={!!errors.name}
                  validateStatus={errors.name ? 'error' : null}
                  help={errors.title ? errors.title : `What's your name?`}
                >
                  <Field
                    required
                    value={values.name}
                    name="name"
                    placeholder="Display name"
                    component={Input}
                    onChange={e => setFieldValue('name', e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  className="medium-width"
                  label="Email"
                  required
                  hasFeedback={!!errors.email}
                  validateStatus={errors.email ? 'error' : null}
                  help={errors.email ? errors.email : `What's your email?`}
                >
                  <Field
                    type="email"
                    required
                    disabled={values.emailDisabled}
                    name="email"
                    value={values.email}
                    placeholder="Email address"
                    component={Input}
                    onChange={e => setFieldValue('email', e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  className="medium-width"
                  label="Bio"
                  hasFeedback={!!errors.bio}
                  validateStatus={errors.bio ? 'error' : null}
                  help={
                    errors.bio
                      ? errors.bio
                      : `Tell us something interesting about you`
                  }
                >
                  <Field
                    required
                    name="bio"
                    placeholder="A short introduction to yourself"
                    component={Input.TextArea}
                    onChange={e => setFieldValue('bio', e.target.value)}
                  />
                </Form.Item>

                <Button
                  loading={updating}
                  disabled={updating}
                  type="primary"
                  htmlType="submit"
                >
                  SAVE SETTINGS
                </Button>
              </>
            );
          }}
        </FormWrapper>
      )}
    </App>
  );
}

export default SettingsPage;
