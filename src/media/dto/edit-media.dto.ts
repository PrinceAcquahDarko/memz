import {  IsNumber, IsOptional, IsString } from "class-validator";

export class editMediaDto{

    @IsString()
    @IsOptional()
    title?:string
    
    @IsString()
    @IsOptional()
    description?:string

    @IsNumber()
    likes: number;

    
    @IsNumber()
    dislikes: number;


}