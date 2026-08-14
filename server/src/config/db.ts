import mongoose from 'mongoose';
let connectionPromise: Promise<typeof mongoose> | null = null;
export function connectDB(){
  const uri=process.env.MONGO_URI;
  if(!uri) throw new Error('MONGO_URI is not configured');
  if(mongoose.connection.readyState===1) return Promise.resolve(mongoose);
  if(!connectionPromise) connectionPromise=mongoose.connect(uri).finally(()=>{connectionPromise=null});
  return connectionPromise;
}
