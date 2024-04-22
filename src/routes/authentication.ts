import express from "express";
import { isAuthenticated, isOwner } from "../middleware/authenticationMiddleware";
import { login, register } from "../controller/authentication";
import { allUsers, updateUser, deleteUser } from "../controller/users";

export default (router: express.Router) => {
  router.get("/check", (req: express.Request, res: express.Response) => {
    res.send("checking route in authentication.ts");
  });
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/users", allUsers);
  router.patch("/users/:id",isAuthenticated,isOwner,updateUser);
  router.delete("/users/:id",isAuthenticated,isOwner,deleteUser);
};
