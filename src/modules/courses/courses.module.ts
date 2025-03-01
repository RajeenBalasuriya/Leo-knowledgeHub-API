import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CaslModule } from 'src/casl/casl.module';
import { Course, CourseSchema } from 'src/entities/course.entity';
import { CourseRepository } from 'src/repositories/course.repository';

@Module({
  imports: [MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),CaslModule],
  controllers: [CoursesController],
  providers: [CoursesService,CourseRepository]
})
export class CoursesModule {}
