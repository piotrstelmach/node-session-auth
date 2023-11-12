import { prismaClient } from '../../config';
import { User } from '@prisma/client';

export const findUser = async (email: string): Promise<User | null> => {
  return await prismaClient.user.findUnique({
    where: {
      email,
    },
  });
};
