import mongoose,{Schema,Types} from 'mongoose';
export interface IReview{user:Types.ObjectId;product:Types.ObjectId;rating:number;comment:string}
const schema=new Schema<IReview>({user:{type:Schema.Types.ObjectId,ref:'User',required:true},product:{type:Schema.Types.ObjectId,ref:'Product',required:true},rating:{type:Number,required:true,min:1,max:5},comment:{type:String,required:true,trim:true}},{timestamps:true});
schema.index({user:1,product:1},{unique:true});
export default mongoose.model<IReview>('Review',schema);
