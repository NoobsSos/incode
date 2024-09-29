import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { ITable } from "../../intefaces/table.interface";
import { ITableCreate } from "../../intefaces/table_create.inteface";
import { table } from "../../services/table.service";

interface ITableState {
    currentTable: ITable,
}

const initialState: ITableState = {
    currentTable: {
        name: "",
        tasks: []
    },
}
export const createTable = createAsyncThunk(
    'table',
    async (tableToCreate: ITableCreate) => {
        await table.createOrLoadTable(tableToCreate); 
        return "Success!"
    }
)

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        setTable: (state, action) => {
            state.currentTable = action.payload;
          },
        closeTable: (state) => {
            state.currentTable = initialState.currentTable;
        }
    },
})

const { actions, reducer: tableReducer } = tableSlice

const tableActions = {
    ...actions,
    createTable
}

export { tableActions, tableReducer }