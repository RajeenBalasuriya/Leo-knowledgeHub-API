import { Injectable } from '@nestjs/common';
import { ICourse } from 'src/interfaces/course.interface';
import { CourseDTO } from './dtos/course.dto';
import { CourseRepository } from 'src/repositories/course.repository';
import { Schema as MongooseSchema, Types } from 'mongoose';

@Injectable()
export class CoursesService {
    constructor(private readonly courseRepository: CourseRepository) {};

    async getAllCourses(): Promise<ICourse[]>{
        return await this.courseRepository.getAllCourses();
    }

    async createCourse(createCourse: CourseDTO):Promise<ICourse>{
        const createdUser = await this.courseRepository.createUser(createCourse);
        return createdUser;
    }

    async deleteCourse(_id : Types.ObjectId): Promise<ICourse>{
        return await  this.courseRepository.deleteCourse(_id);
    }

    async getCourseByStudentID(studentID :string) :Promise<ICourse[]>{
        return await  this.courseRepository.getCourseByStudentID(studentID);
    }

    async getCourseByTitle(title :string) :Promise<ICourse>{
        return await  this.courseRepository.getCourseByTitle(title);
    }
    
}
