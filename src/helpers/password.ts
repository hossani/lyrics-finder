import bcrypt from "bcrypt";


async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

async function comparePasswords(
  password: string,
  hashedPassword: string | any
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export { hashPassword, comparePasswords };
