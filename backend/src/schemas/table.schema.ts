import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type CatDocument = HydratedDocument<Table>;

@Schema()
export class Table {
    @Prop()
    name: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Task' }] })
    tasks: Types.ObjectId[]; 
}

export const TableSchema = SchemaFactory.createForClass(Table);
