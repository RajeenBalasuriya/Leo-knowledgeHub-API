import { BadRequestException, Body, Controller, Delete, Get, HttpStatus, Post, Put, Res } from '@nestjs/common';
import { Response } from 'express';
import { CoursesService } from './courses.service';
import { CourseDTO } from './dtos/course.dto';
import { Types, Schema } from 'mongoose';

@Controller('courses')
export class CoursesController {

    constructor(private coursesService: CoursesService) {
        
    }

    @Get('/all')
    async getAllCourses(){
        return await this.coursesService.getAllCourses();
    }

    @Post('/newCourse')
    async createNewCourse(@Body() courseDTO : CourseDTO, @Res() res: Response){
        try {
            const newCourse = await this.coursesService.createCourse(courseDTO);
            return res.status(HttpStatus.CREATED).send(newCourse);
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    @Delete()
    async deleteCourse(@Body('_id') _id: string) {  
      if (!_id || !Types.ObjectId.isValid(_id)) {
        throw new BadRequestException('Invalid course ID');
      }
  
      const courseId = new Types.ObjectId(_id);
      return await this.coursesService.deleteCourse(courseId);
    }

    @Get('/getCourseByStudentID')
    async getCourseByStudentID(@Body("studentID") studentID :string){
        return await this.coursesService.getCourseByStudentID(studentID);
    }

    @Get('/getCourseByTitle')
    async getCourseByTitle(@Body("title") title :string){
        return await this.coursesService.getCourseByTitle(title);
    }

    @Put('/updateCourse')
    async updateCourse(@Body() courseDTO : CourseDTO){
        return await this.coursesService.updateCourse(courseDTO);
    }
}
