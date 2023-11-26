import { redisClient } from '../../config';
import { v4 as uuidv4 } from 'uuid';

export const createSession = async (userId: number) => {
  const sessionId = uuidv4();
  await redisClient.set(`user:${userId}`, sessionId, {
    EX: 60 * 60 * 1000,
  });

  return {
    sessionId,
  };
};

export const checkSession = async (userId: number, sessionId: string) => {
  const session = await redisClient.get(`user:${userId}`);
  return session === sessionId;
};

export const clearSession = async (userId: number) => {
  await redisClient.del(`user:${userId}`);
  return;
};
