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

  async listFollowing(userId: string, { page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      followRepository.listFollowing(userId, { skip, take: limit }),
      followRepository.countFollowing(userId),
    ]);

    return toPaginatedResponse(items, page, limit, total);
  }

  async listFollowers(userId: string, { page, limit }: { page: number; limit: number }) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      followRepository.listFollowers(userId, { skip, take: limit }),
      followRepository.countFollowers(userId),
    ]);

    return toPaginatedResponse(items, page, limit, total);
  }
}

function toPaginatedResponse<T>(items: T[], page: number, limit: number, total: number) {
  return {
    items,
    page,
    limit,
    total,
    totalPages: Math.max(1, Math.ceil(total / limit)),
    hasNextPage: page * limit < total,
  };
}
