import * as React from 'react';
import { get } from 'lodash';
import {
  Button,
  InputField,
  TextareaField,
  FieldStack,
  useToasts,
  Flex,
  Columns,
  Container
} from 'bumbag';
import useTranslation from 'locales/useTranslation';
import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMeQuery, useUpdateUserMutation } from 'generated';
import App from 'components/App';
import withApollo from 'lib/withApollo';

function SettingsPage() {
  const { t } = useTranslation();
  const toasts = useToasts();
  const { data: meData, loading } = useMeQuery();
  const me = get(meData, 'me', null);

  const [updateUser, { loading: updating, error }] = useUpdateUserMutation({
    onCompleted: () => {
      toasts.success({
        title: t('page.profile.form.onSuccess.title'),
        message: t('page.profile.form.onSuccess.message')
      });
    }
  });

  const defaultValues = me
    ? {
        email: me.email,
        name: me.name,
        bio: me.bio || ''
      }
    : {};

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Must be a valid email address')
      .required('Email is required')
      .nullable(),
    name: Yup.string().required('Email is required'),
    bio: Yup.string()
  });

  const { handleSubmit, errors, control } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema)
  });
  const onSubmit = values => {
    return updateUser({
      variables: {
        input: {
          email: values.email,
          name: values.name,
          bio: values.bio
        }
      }
    });
  };

  if (loading) {
    return <p>Loading ...</p>;
  }

  return (
    <App
      title={t('page.profile.title')}
      description={t('page.profile.description')}
      breadcrumbs={[{ label: t('page.profile.title') }]}
      requiresUser
    >
      <Container breakpoint="tablet">
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldStack>
            <Controller
              control={control}
              as={InputField}
              isRequired
              name="name"
              autoComplete="name"
              label={t('page.profile.form.name.label')}
              placeholder={t('page.profile.form.name.placeholder')}
              defaultValue={defaultValues.name || ''}
              state={get(errors, 'name.message') ? 'danger' : undefined}
            />

            <Controller
              control={control}
              as={InputField}
              isRequired
              name="email"
              type="email"
              autoComplete="email"
              label={t('page.profile.form.email.label')}
              placeholder={t('page.profile.form.email.placeholder')}
              defaultValue={defaultValues.email || ''}
              state={get(errors, 'email.message') ? 'danger' : undefined}
            />

            <Controller
              control={control}
              as={TextareaField}
              name="bio"
              label={t('page.profile.form.bio.label')}
              placeholder={t('page.profile.form.bio.placeholder')}
              defaultValue={defaultValues.bio || ''}
              state={get(errors, 'bio.message') ? 'danger' : undefined}
            />
          </FieldStack>

          <Flex justifyContent="flex-end">
            <Button
              marginTop="major-2"
              isLoading={updating}
              disabled={updating}
              type="submit"
            >
              {t('page.profile.form.callToAction')}
            </Button>
          </Flex>
        </form>
      </Container>
    </App>
  );
}

export default withApollo(SettingsPage);
