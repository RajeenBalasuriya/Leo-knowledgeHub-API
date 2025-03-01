import { BadRequestException, Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CoursesService } from './courses.service';
import { CourseDTO } from './dtos/course.dto';

@Controller('courses')
export class CoursesController {

    constructor(private coursesService: CoursesService) {
        
    }

    @Get('/all')
    getAllCourses(){
        return this.coursesService.getAllCourses();
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
}
