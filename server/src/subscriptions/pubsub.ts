/*
 * WARNING:
 * This implementation of pubsub is not production-grade
 * Subscriptions should be handles by an external store, Like Redis
 * You can see the different options available here: https://github.com/apollographql/graphql-subscriptions#pubsub-implementations
 */
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

export default pubsub;
