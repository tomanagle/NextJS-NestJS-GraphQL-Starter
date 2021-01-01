import { Resolver, Subscription, Args, Mutation } from '@nestjs/graphql';
import { Message } from './chat.schema';
import { SendMessageInput } from './chat.input';
import pubsub from '../subscriptions/pubsub';

const newMessage = 'newMessage';

@Resolver()
export class ChatResolver {
  @Mutation(() => Message)
  async sendMessage(@Args('input') input: SendMessageInput) {
    const message = {
      sent: new Date(),
      ...input,
    };

    await pubsub.publish(newMessage, { [newMessage]: message });

    return message;
  }

  @Subscription(() => Message, {
    name: newMessage,
  })
  newMessage(): any {
    return pubsub.asyncIterator(newMessage);
  }
}
