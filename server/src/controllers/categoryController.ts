import type {Request,Response} from 'express';import Category from '../models/Category.js';
const slugify=(v:string)=>v.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
export async function listCategories(_req:Request,res:Response){res.json(await Category.find().sort('name'))}
export async function createCategory(req:Request,res:Response){if(!req.body.name)return void res.status(400).json({message:'Name is required'});const slug=slugify(req.body.name);if(await Category.findOne({$or:[{name:req.body.name},{slug}]}))return void res.status(409).json({message:'Category already exists'});res.status(201).json(await Category.create({name:req.body.name,slug}))}
export async function deleteCategory(req:Request,res:Response){const deleted=await Category.findByIdAndDelete(req.params.id);if(!deleted)return void res.status(404).json({message:'Category not found'});res.status(204).send()}
