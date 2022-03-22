import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ collection: 'agencies', _id: true, timestamps: true })
export class Agency {
  @Prop({ required: true, unique: true })
  _id: mongoose.Types.ObjectId;
  @Prop({ required: true, unique: true })
  name: string;
  @Prop({ required: false })
  range: string;
}

export const AgencySchema = SchemaFactory.createForClass(Agency);
