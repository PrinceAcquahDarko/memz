import {  IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

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
    @IsOptional()
    likes: number;

    @IsOptional()
    @IsNumber()
    dislikes: number;


    @IsString()
    @IsNotEmpty()
    Mediatype: string;



}