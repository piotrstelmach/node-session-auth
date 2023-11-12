import { PasswordHashingError } from '../errors/auth';
import bcrypt from 'bcrypt';

export const hashPassword = async (password: string) => {
  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (error) {
    if (error instanceof Error) throw new PasswordHashingError(error.message);
  }
  return hashedPassword;
};

export const decryptPassword = async (
  hashedPassword: string,
  password: string
) => {
  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    if (error instanceof Error) throw new PasswordHashingError(error.message);
  }
  return isPasswordValid;
};
