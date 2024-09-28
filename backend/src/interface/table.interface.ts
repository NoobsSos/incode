import { Document, Types } from 'mongoose';

export interface ITable extends Document {
    name: string;
    tasks: Types.ObjectId[];
}