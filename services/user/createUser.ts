import { Prisma, User } from '@prisma/client';
import { prismaClient } from '../../config';
import { UserRegisterInput } from '../../schema/validation/user.schema';
import { hashPassword } from '../../utils/password';

export const createUser = async (
  userInput: UserRegisterInput
): Promise<User> => {
  const hashedPassword: string | undefined = await hashPassword(
    userInput.password
  );

  const newUser: Prisma.UserCreateInput = {
    name: userInput.name,
    password: hashedPassword ?? '',
    email: userInput.email,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  return await prismaClient.user.create({
    data: newUser,
  });
};
