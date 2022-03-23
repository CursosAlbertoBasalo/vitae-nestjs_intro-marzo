import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Ranges } from '../models/range.enum';
import { Status } from '../models/status.enum';

@Schema({ collection: 'agencies', _id: true, timestamps: true })
export class Agency {
  @Prop({ required: true })
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: false, index: true })
  range: Ranges;

  @Prop({ required: false, index: true })
  status: Status;

  @Prop({ required: false, index: false })
  fee: number;
}

export const AgencySchema = SchemaFactory.createForClass(Agency);
AgencySchema.index({ range: 1, status: 1 });
