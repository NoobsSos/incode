export interface ITask {
    createTask(task: ITask): unknown;
    _id: string;
    title: string;
    description: string;
    due: Date;
    priority: string;
    status: string;
}