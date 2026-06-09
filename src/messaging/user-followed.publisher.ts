import { getRabbitChannel, getRabbitExchange } from './rabbitmq.connection.js';

export interface UserFollowedEvent {
  event: 'USER_FOLLOWED';
  followerId: string;
  followedId: string;
  occurredAt: string;
}

const USER_FOLLOWED_ROUTING_KEY = 'user.followed';

export async function publishUserFollowedEvent(payload: UserFollowedEvent): Promise<void> {
  const channel = await getRabbitChannel();
  const exchange = getRabbitExchange();
  const message = Buffer.from(JSON.stringify(payload));

  channel.publish(exchange, USER_FOLLOWED_ROUTING_KEY, message, {
    persistent: true,
    contentType: 'application/json',
  });
}
