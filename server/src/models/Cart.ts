import mongoose,{Schema,Types} from 'mongoose';
export interface ICartItem{product:Types.ObjectId;quantity:number}
export interface ICart{user:Types.ObjectId;items:ICartItem[]}
const itemSchema=new Schema<ICartItem>({product:{type:Schema.Types.ObjectId,ref:'Product',required:true},quantity:{type:Number,required:true,min:1}},{_id:false});
const schema=new Schema<ICart>({user:{type:Schema.Types.ObjectId,ref:'User',required:true,unique:true},items:{type:[itemSchema],default:[]}},{timestamps:true});
export default mongoose.model<ICart>('Cart',schema);
