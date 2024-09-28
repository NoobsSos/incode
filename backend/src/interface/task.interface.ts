import { Document } from 'mongoose';

export interface ITask extends Document {
    title: string;
    description: string;
    due: Date;
    priority: string;
    status: string;
    relatedTable: string;
}