import { base } from "./base.service";
import { ITask } from "../intefaces/task.interface";
import { ITaskCreate } from "../intefaces/task_create.interface";
export const task = {
    getCurrentBoardTasks: (relatedTable: string) => base.get<ITask[]>(`/task/${relatedTable}`),
    updateTask: (id: string, data: ITask) => base.put<ITask>(`/task/${id}`, data),
    createTask: (data: ITaskCreate) => base.post<ITaskCreate>(`/task`, data),
    deleteTask: (id: string) => base.delete(`/task/${id}`),
}