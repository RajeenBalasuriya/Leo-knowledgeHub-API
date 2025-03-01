import { IsString, IsNotEmpty, IsOptional, IsNumber, IsArray, IsBoolean, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ICourse } from 'src/interfaces/course.interface';

class InstructorDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  profilePicture?: string;
}

class LessonDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  videoUrl?: string;

  @IsString()
  @IsOptional()
  content?: string;
}

class SectionDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LessonDTO)
  lessons: LessonDTO[];
}

export class CourseDTO implements ICourse{
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  category?: string;

  @ValidateNested()
  @Type(() => InstructorDTO)
  instructor: InstructorDTO;

  @IsNumber()
  @IsOptional()
  rating?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SectionDTO)
  sections: SectionDTO[];

  @IsNumber()
  @IsArray()
  enrolledStudent: string[]; // In minutes

}
