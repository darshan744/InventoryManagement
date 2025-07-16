import bcrypt from "bcrypt";

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export function comparePassword(
  userEnteredPassword: string,
  dbPassword: string,
): Promise<boolean> {
  return bcrypt.compare(userEnteredPassword, dbPassword);
}
