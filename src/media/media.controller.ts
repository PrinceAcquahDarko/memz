import { Body, Controller, Post, Delete, UploadedFile, UseInterceptors, Patch, Param, ParseIntPipe, Get, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { editMediaDto, MediaDto } from './dto';
import { MediaService } from './media.service';


const imageFileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp3|mp4)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };

  const editFileName = (req, file, callback) => {
 
    callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  };

@UseGuards(JwtGuard)
@Controller('media')
export class MediaController {
    constructor(private ms: MediaService){}

    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './files',
            filename: editFileName,
          }),
          fileFilter: imageFileFilter,
          limits:{
            fileSize: 1024*1024 * 5
          }
    }))
    uploadMedia(@GetUser('id') userId: number, @Body() dto:MediaDto, @UploadedFile() file: Express.Multer.File) {
      return this.ms.uploadMedia(dto, file,userId)
    }

    @Patch(':id')
    editMedia(@GetUser('id') userId: number, @Body() dto:editMediaDto, @Param('id', ParseIntPipe) id:number){
        return this.ms.editMedia(dto,id, userId)
    }

    @Get(':id')
    getMedia(@Param('id', ParseIntPipe) id:number){
        return this.ms.findMedia(id)
    }

    @Get()
    getAllMedia(@GetUser('id') userId: number,){
      // console.log(userId, 'from userId')  
       
      return this.ms.getAllMedia()
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete(':id')
    deleteBookmarById(@GetUser('id') userId: number, @Param('id', ParseIntPipe) id:number){
        return this.ms.deleteMedia(id, userId)
    }



    
}
