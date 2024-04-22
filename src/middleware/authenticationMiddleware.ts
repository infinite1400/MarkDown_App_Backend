import { findBySessionToken } from "../db/users";
import express from "express";
import { userType } from "../db/users";
import { ObjectId } from "mongoose";

type userTypeWithId = userType & {
  _id: ObjectId;
};
type customRequest = express.Request & {
  user: userTypeWithId;
};

export const isAuthenticated = async (
  req: customRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["MARKDOWN-AUTH"];
    if (!sessionToken) {
      return res.status(403).json(" sessionToken is not there !");
    }

    const user: userTypeWithId = await findBySessionToken(sessionToken).select("+_id +authentication");
    if (!user) {
      return res.status(403).json("No User exist for this session Token !");
    }
    req.user = user;

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

export const isOwner = async (
  req: customRequest,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const current_id = req.user._id;

    if (!current_id) {
      return res.status(403).json("Your are not Owner ! ");
    }

    if (current_id.toString() !== id) {
      return res.status(403).json("Your are not Owner ! ");
    }
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};
