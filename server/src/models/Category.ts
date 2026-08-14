import mongoose,{Schema} from 'mongoose';
export interface ICategory{name:string;slug:string}
const schema=new Schema<ICategory>({name:{type:String,required:true,unique:true,trim:true},slug:{type:String,required:true,unique:true,lowercase:true,trim:true}},{timestamps:true});
export default mongoose.model<ICategory>('Category',schema);
