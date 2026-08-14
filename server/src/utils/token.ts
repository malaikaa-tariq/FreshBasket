import jwt, { type SignOptions } from 'jsonwebtoken';
export function signToken(userId:string){const secret=process.env.JWT_SECRET;if(!secret)throw new Error('JWT_SECRET is not configured');const expiresIn=(process.env.JWT_EXPIRES_IN||'7d') as SignOptions['expiresIn'];return jwt.sign({userId},secret,{expiresIn})}
