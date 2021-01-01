import * as React from 'react';
import { Box } from 'bumbag';
import Messages from 'components/chat/Messages';
import MessageForm from 'components/chat/MessageForm';

function ChatContainer() {
  return (
    <Box>
      <Box>
        <Messages />
      </Box>
      <MessageForm />
    </Box>
  );
}

export default ChatContainer;
