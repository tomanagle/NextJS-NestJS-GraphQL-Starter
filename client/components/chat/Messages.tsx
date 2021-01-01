import React from 'react';
import { List } from 'bumbag';
import { useNewMessageSubscription } from 'generated';

function Messages() {
  const [messages, setMessages] = React.useState([]);
  useNewMessageSubscription({
    onSubscriptionData: ({ subscriptionData }) => {
      setMessages([...messages, subscriptionData.data.newMessage]);
    }
  });

  return (
    <List>
      {messages.map(message => {
        return <List.Item key={message.sent}>{message.body}</List.Item>;
      })}
    </List>
  );
}

export default Messages;
