import * as React from 'react';
import { withApolloWithSubscriptions } from 'lib/withApollo';
import App from 'components/App';
import ChatContainer from 'containers/Chat';
import { useTranslation } from 'react-i18next';

function ChatPage() {
  const { t } = useTranslation();
  return (
    <App title={t('page.chat.title')} description={t('page.chat.description')}>
      <ChatContainer />
    </App>
  );
}

export default withApolloWithSubscriptions(ChatPage);
