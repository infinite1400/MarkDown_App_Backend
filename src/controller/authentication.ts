import express from "express";
import userModel, { findByEmail, findByUsername } from "../db/users";
import { authentication, random } from "../helpers/authenticationHelper";
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, username, password } = req.body;
    if (!email || !password || !username) {
      console.log("All Fields are Mandatory !");
      return res.status(403).json("Please Fill All the fields");
    }
    const existing_email_user = await findByEmail(email);

    if (existing_email_user) {
      return res.status(403).json("Email already exist ! Please login...");
    }

    const existing_email_username = await findByUsername(username);

    if (existing_email_username) {
      return res.status(403).json("Username already exist ! Try Different...");
    }

    const salt = random();
    const user = new userModel({
      username: username,
      email: email,
      authentication: {
        salt: salt,
        password: authentication(salt, password),
      },
    });

    await user.save().then((user) => user.toObject());
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
