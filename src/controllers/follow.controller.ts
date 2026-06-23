import type { Request, Response } from 'express';
import { AppError } from '../errors/app-error.js';
import { FollowService } from '../services/follow.service.js';

const followService = new FollowService();

export async function followUserController(request: Request, response: Response) {
  const followerId = getAuthenticatedUserId(request);
  const { userId: followedId } = request.params;

  const follow = await followService.followUser(followerId, followedId);

  return response.status(201).json(toFollowResponse(follow));
}

export async function unfollowUserController(request: Request, response: Response) {
  const followerId = getAuthenticatedUserId(request);
  const { userId: followedId } = request.params;

  await followService.unfollowUser(followerId, followedId);

  return response.status(204).send();
}

export async function listFollowingController(request: Request, response: Response) {
  const userId = getAuthenticatedUserId(request);
  const page = normalizePositiveInt(request.query.page, 1);
  const limit = normalizePositiveInt(request.query.limit, 24, 100);
  const follows = await followService.listFollowing(userId, { page, limit });

  return response.json({
    ...follows,
    items: follows.items.map(toFollowResponse),
  });
}

export async function listFollowersController(request: Request, response: Response) {
  const userId = getAuthenticatedUserId(request);
  const page = normalizePositiveInt(request.query.page, 1);
  const limit = normalizePositiveInt(request.query.limit, 24, 100);
  const follows = await followService.listFollowers(userId, { page, limit });

  return response.json({
    ...follows,
    items: follows.items.map(toFollowResponse),
  });
}

function getAuthenticatedUserId(request: Request): string {
  const userId = request.header('X-User-Id');

  if (!userId) {
    throw new AppError('Authenticated user header is required.', 401);
  }

  return userId;
}

function toFollowResponse(follow: { id: string; followerId: string; followedId: string; createdAt: Date }) {
  return {
    id: follow.id,
    followerId: follow.followerId,
    followedId: follow.followedId,
    createdAt: follow.createdAt.toISOString(),
  };
}

function normalizePositiveInt(value: unknown, fallback: number, max = Number.MAX_SAFE_INTEGER) {
  if (typeof value !== 'string') {
    return fallback;
  }

  const parsed = Number(value);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }

  return Math.min(parsed, max);
}
