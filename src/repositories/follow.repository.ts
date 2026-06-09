import { prisma } from '../config/prisma.js';

export class FollowRepository {
  findByUsers(followerId: string, followedId: string) {
    return prisma.follow.findUnique({
      where: {
        followerId_followedId: {
          followerId,
          followedId,
        },
      },
    });
  }

  create(followerId: string, followedId: string) {
    return prisma.follow.create({
      data: {
        followerId,
        followedId,
      },
    });
  }

  delete(followerId: string, followedId: string) {
    return prisma.follow.delete({
      where: {
        followerId_followedId: {
          followerId,
          followedId,
        },
      },
    });
  }

  listFollowing(followerId: string) {
    return prisma.follow.findMany({
      where: {
        followerId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  listFollowers(followedId: string) {
    return prisma.follow.findMany({
      where: {
        followedId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
