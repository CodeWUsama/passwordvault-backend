import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import sendResponse from "./../helpers/responseHelper.js";

export const handleSignup = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    sendResponse(res);
  } catch (error) {
    sendResponse(res, null, error.message);
  }
};
