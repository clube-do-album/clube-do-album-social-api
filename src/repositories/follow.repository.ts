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

  listFollowing(followerId: string, { skip, take }: { skip: number; take: number }) {
    return prisma.follow.findMany({
      where: {
        followerId,
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  countFollowing(followerId: string) {
    return prisma.follow.count({
      where: {
        followerId,
      },
    });
  }

  listFollowers(followedId: string, { skip, take }: { skip: number; take: number }) {
    return prisma.follow.findMany({
      where: {
        followedId,
      },
      skip,
      take,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  countFollowers(followedId: string) {
    return prisma.follow.count({
      where: {
        followedId,
      },
    });
  }
}
