import mongoose from "mongoose";
export type userType={
    username : String,
    email : String,
    authentication?: {
        password  : String,
        salt?: String,
        sessionToken?: String
    }
}
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, required: false, select: false },
    sessionToken: { type: String, required: false, select: false },
  },
});

const userModel=mongoose.model<userType>("User",userSchema);
// const user : userType =new userModel({
//     username:"admin",
//     email : "admin@example.com" ,
//     authentication : {
//         password : "1234",
//         salt : "1234",
//         sessionToken : "1234"
//     }
// });
// console.log(user);
export default userModel;

export const findByEmail=(email : string)=>{
    return userModel.findOne({email : email});
}

export const findByUsername=(username : string)=>{
    return userModel.findOne({username : username});
}

export const findBySessionToken=(sessionToken : string)=>{
  return userModel.findOne({"authentication.sessionToken" : sessionToken});
}