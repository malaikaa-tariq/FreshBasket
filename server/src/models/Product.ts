import mongoose,{Schema,Types} from 'mongoose';
export interface IProduct{name:string;description:string;price:number;image:string;unit:string;stock:number;featured:boolean;category:Types.ObjectId;averageRating:number}
const schema=new Schema<IProduct>({name:{type:String,required:true,trim:true},description:{type:String,required:true,trim:true},price:{type:Number,required:true,min:0},image:{type:String,required:true},unit:{type:String,required:true},stock:{type:Number,required:true,min:0,default:0},featured:{type:Boolean,default:false},category:{type:Schema.Types.ObjectId,ref:'Category',required:true},averageRating:{type:Number,default:0,min:0,max:5}},{timestamps:true});
export default mongoose.model<IProduct>('Product',schema);
