import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Instructor Schema
@Schema()
class Instructor {
  @Prop({ required: true })
  name: string;

  @Prop()
  bio?: string;

  @Prop()
  profilePicture?: string;
}

// Lesson Schema
@Schema()
class Lesson {
  @Prop({ required: true })
  title: string;

  @Prop()
  videoUrl?: string;

  @Prop()
  content?: string;
}

// Section Schema
@Schema()
class Section {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [Lesson] })
  lessons: Lesson[];
}

// Main Course Schema
@Schema()
export class Course extends Document {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  category?: string;

  @Prop({ type: Instructor, required: true })
  instructor: Instructor;

  @Prop()
  rating?: number;

  @Prop({ type: [Section], default: [] })
  sections: Section[];

  @Prop({ type: [String], default: [] }) // Array of Student IDs
  enrolledStudent: string[];
}


export const CourseSchema = SchemaFactory.createForClass(Course);