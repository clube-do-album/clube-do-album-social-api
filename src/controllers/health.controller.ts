import type { Request, Response } from 'express';

export function healthController(_request: Request, response: Response) {
  return response.json({
    service: 'clube-do-album-social-api',
    status: 'UP',
  });
}
