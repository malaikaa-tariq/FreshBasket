import bcrypt from 'bcryptjs';
import mongoose, { Schema, type HydratedDocument } from 'mongoose';
export type UserRole='user'|'admin';
export interface IUser { name:string; email:string; password:string; role:UserRole; isActive:boolean; comparePassword(password:string):Promise<boolean>; }
const userSchema=new Schema<IUser>({name:{type:String,required:true,trim:true},email:{type:String,required:true,unique:true,lowercase:true,trim:true},password:{type:String,required:true,minlength:6},role:{type:String,enum:['user','admin'],default:'user'},isActive:{type:Boolean,default:true}},{timestamps:true});
userSchema.pre('save',async function(){if(!this.isModified('password'))return;this.password=await bcrypt.hash(this.password,10)});
userSchema.methods.comparePassword=function(password:string){return bcrypt.compare(password,this.password)};
export type UserDocument=HydratedDocument<IUser>;
export default mongoose.model<IUser>('User',userSchema);
