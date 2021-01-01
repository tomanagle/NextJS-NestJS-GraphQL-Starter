import React from 'react';
import { InputField, Button, Box, Flex } from 'bumbag';
import { useSendMessageMutation } from 'generated';

function MessageForm() {
  const [body, setBody] = React.useState('');

  const [sendMessage, { loading }] = useSendMessageMutation({
    variables: {
      input: {
        body
      }
    }
  });

  return (
    <Flex width="100%" marginTop="major-4">
      <InputField
        flex="1"
        marginRight="major-4"
        value={body}
        name="body"
        placeholder="message"
        onChange={e => setBody(e.target.value)}
      />

      <Button
        isLoading={loading}
        onClick={() => {
          sendMessage();
          setBody('');
        }}
      >
        SEND
      </Button>
    </Flex>
  );
}

export default MessageForm;
