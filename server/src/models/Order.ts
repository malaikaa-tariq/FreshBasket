import mongoose,{Schema,Types} from 'mongoose';
export type OrderStatus='pending'|'confirmed'|'packed'|'out-for-delivery'|'delivered'|'cancelled';
export interface IOrderItem{product:Types.ObjectId;name:string;price:number;quantity:number}
export interface IOrder{user:Types.ObjectId;items:IOrderItem[];subtotal:number;deliveryFee:number;total:number;deliveryAddress:string;paymentMethod:'cash-on-delivery'|'card';status:OrderStatus}
const itemSchema=new Schema<IOrderItem>({product:{type:Schema.Types.ObjectId,ref:'Product',required:true},name:{type:String,required:true},price:{type:Number,required:true},quantity:{type:Number,required:true,min:1}},{_id:false});
const schema=new Schema<IOrder>({user:{type:Schema.Types.ObjectId,ref:'User',required:true},items:{type:[itemSchema],required:true},subtotal:{type:Number,required:true},deliveryFee:{type:Number,required:true,default:0},total:{type:Number,required:true},deliveryAddress:{type:String,required:true,trim:true},paymentMethod:{type:String,enum:['cash-on-delivery','card'],default:'cash-on-delivery'},status:{type:String,enum:['pending','confirmed','packed','out-for-delivery','delivered','cancelled'],default:'pending'}},{timestamps:true});
export default mongoose.model<IOrder>('Order',schema);
