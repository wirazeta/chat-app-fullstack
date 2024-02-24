import { Document } from "mongoose";

export interface UsersProfile extends Document {
    readonly name:string;
    readonly email:string;
    readonly pic?:string;
    readonly isAdmin:boolean;
}