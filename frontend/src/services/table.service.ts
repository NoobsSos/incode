import { base } from "./base.service";
import { ITable } from "../intefaces/table.interface";
import { ITableCreate } from "../intefaces/table_create.inteface";

import { ITaskCreate } from "../intefaces/task_create.interface";

export const table = {
    createOrLoadTable: (data: ITableCreate) => base.post<ITable>(`/table`, data),
    updateTable: (tableName: string, data: ITaskCreate) => base.put<ITaskCreate>(`/table/${tableName}`, data),
}