import type {NextFunction,Request,Response} from 'express';
export function notFound(req:Request,res:Response){res.status(404).json({message:`Route not found: ${req.method} ${req.originalUrl}`})}
export function errorHandler(err:unknown,_req:Request,res:Response,_next:NextFunction){console.error(err);const message=err instanceof Error?err.message:'Server error';res.status(500).json({message})}
