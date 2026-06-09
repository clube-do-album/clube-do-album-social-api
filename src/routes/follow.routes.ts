import { Router } from 'express';
import {
  followUserController,
  listFollowersController,
  listFollowingController,
  unfollowUserController,
} from '../controllers/follow.controller.js';

export const followRouter = Router();

followRouter.post('/follows/:userId', async (request, response, next) => {
  try {
    await followUserController(request, response);
  } catch (error) {
    next(error);
  }
});

followRouter.delete('/follows/:userId', async (request, response, next) => {
  try {
    await unfollowUserController(request, response);
  } catch (error) {
    next(error);
  }
});

followRouter.get('/follows/following', async (request, response, next) => {
  try {
    await listFollowingController(request, response);
  } catch (error) {
    next(error);
  }
});

followRouter.get('/follows/followers', async (request, response, next) => {
  try {
    await listFollowersController(request, response);
  } catch (error) {
    next(error);
  }
});
