import { login, register } from "../controller/authentication";
import { allUsers, updateUser, deleteUser } from "../controller/users";
import express from "express";

export default (router: express.Router) => {
  router.get("/check", (req: express.Request, res: express.Response) => {
    res.send("checking route in authentication.ts");
  });
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/users", allUsers);
  router.patch("/users/:id", updateUser);
  router.delete("/users/:id", deleteUser);
};
