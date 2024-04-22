import mongoose from "mongoose";
export const dbConnect = () : void => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "Markdown_App_Backend" })
    .then(() => {
      console.log("Database Connected Successfully ! ");
    })
    .catch((error) => {
      console.log(error);
    });
};
