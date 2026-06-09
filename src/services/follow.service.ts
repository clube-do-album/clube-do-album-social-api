import { AppError } from '../errors/app-error.js';
import { publishUserFollowedEvent } from '../messaging/user-followed.publisher.js';
import { FollowRepository } from '../repositories/follow.repository.js';

const followRepository = new FollowRepository();

export class FollowService {
  async followUser(followerId: string, followedId: string) {
    if (followerId === followedId) {
      throw new AppError('You cannot follow yourself.', 400);
    }

    const existingFollow = await followRepository.findByUsers(followerId, followedId);

    if (existingFollow) {
      throw new AppError('You already follow this user.', 409);
    }

    const follow = await followRepository.create(followerId, followedId);

    await publishUserFollowedEvent({
      event: 'USER_FOLLOWED',
      followerId,
      followedId,
      occurredAt: follow.createdAt.toISOString(),
    });

    return follow;
  }

  async unfollowUser(followerId: string, followedId: string) {
    if (followerId === followedId) {
      throw new AppError('You cannot unfollow yourself.', 400);
    }

    const existingFollow = await followRepository.findByUsers(followerId, followedId);

    if (!existingFollow) {
      throw new AppError('Follow relationship not found.', 404);
    }

    await followRepository.delete(followerId, followedId);
  }

  listFollowing(userId: string) {
    return followRepository.listFollowing(userId);
  }

  listFollowers(userId: string) {
    return followRepository.listFollowers(userId);
  }
}
