export interface ITaskCreate {
    title: string;
    description: string;
    due: Date;
    priority: string;
    status: string;
    relatedTable: string;
}