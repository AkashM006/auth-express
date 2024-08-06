import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const saltRounds = process.env["SALT_ROUNDS"] ?? 5;

const generateHash = async (password: string): Promise<string> => {
  const result = await bcrypt.hash(password, saltRounds);

  return result;
};

const verifyHash = async (
  plainPassword: string,
  hash: string
): Promise<boolean> => {
  const doesMatch = await bcrypt.compare(plainPassword, hash);
  return doesMatch;
};

export { generateHash, verifyHash };
