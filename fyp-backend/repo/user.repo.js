import User from "../models/UserAuth/user";

export const createUser=async ({name,email,password})=>{
 await User.create({ name, email, password });
}