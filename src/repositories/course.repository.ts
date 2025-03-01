import { ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model, Schema as MongooseSchema , Types} from 'mongoose';
import { Course } from '../entities/course.entity';
import { CourseDTO } from '../modules/courses/dtos/course.dto';

export class CourseRepository {
    constructor(@InjectModel(Course.name) private readonly courseModel: Model<Course>) {}

    async createUser(courseDto: CourseDTO):Promise<Course>{
        let course = await this.getCourseByTitle(courseDto.title);

        if (course) {
            throw new ConflictException('Course title already exists');
        }

        course = new this.courseModel({
            title: courseDto.title,
            description: courseDto.description,
            category: courseDto.category,
            instructor: {
              name: courseDto.instructor.name,
              bio: courseDto.instructor.bio,
              profilePicture: courseDto.instructor.profilePicture,
            },
            rating: courseDto.rating,
            sections: courseDto.sections.map(section => ({
              title: section.title,
              lessons: {
                title: section.lessons.title,
                videoUrl: section.lessons.videoUrl,
                content: section.lessons.content                
              },
            })),
            enrolledStudent: courseDto.enrolledStudent || [],
          });

        try {
            course = await course.save();
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!course) {
            throw new ConflictException('Course not created');
        }

        return course;
    }

    // Method to get all courses
    async getAllCourses(): Promise<Course[]> {
        let courses = [];
        try {
        courses = await this.courseModel.find();  // Find all courses in the database
        } catch (error) {
        throw new InternalServerErrorException(error);  // If an error occurs, throw an internal server error
        }

        if (!courses || courses.length === 0) {
        throw new NotFoundException('No courses found');  // If no courses found, throw a not found exception
        }

        return courses;  // Return the list of courses
    }


    async getCourseByTitle(title: string):Promise<Course>{

        let course;
        try {
            course = await this.courseModel.findOne({ title });
            
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        return course;
    }


    async deleteCourse(_id :Types.ObjectId):Promise<Course>{
        let course;
        try {
            course = await this.courseModel.findByIdAndDelete({ _id });
        } catch (error) {
            throw new InternalServerErrorException(error);
        }

        if (!course) {
            throw new NotFoundException('Course not found');
        }

        return course;
    }

    async getCourseByStudentID(enrolledStudentID :string):Promise<Course[]>{
        let courses = [];
        try{
            courses = await this.courseModel.find({ enrolledStudent: enrolledStudentID });
        }catch(error){
            throw new InternalServerErrorException(error);
        }

        if (!courses || courses.length === 0) {
            throw new NotFoundException('Course not found');
        }

        return courses;
    }
}