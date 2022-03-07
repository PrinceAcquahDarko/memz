import {  IsNotEmpty, IsNumber, IsString } from "class-validator";

export class MediaDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    link: string;

    @IsNumber()
    likes: number;

    
    @IsNumber()
    dislikes: number;


    @IsString()
    @IsNotEmpty()
    Mediatype: string;



}