import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    due: Date;

    @Prop()
    priority: string;

    @Prop()
    status: string;

    @Prop()
    relatedTable: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
