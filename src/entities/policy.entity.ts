import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Action } from 'src/enums/action.enum';

@Schema()
export class Policy extends Document {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop([
    {
      action: { type: String, required: true },
      subject: { type: String, required: true },
      fields: { type: [String], required: false },
    },
  ])
  rules: Array<{
    action: Action;
    subject: string;
    fields?: string[];
  }>;
}

export const PolicySchema = SchemaFactory.createForClass(Policy);
