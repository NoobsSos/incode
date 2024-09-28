import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { ITask } from "../../intefaces/task.interface";
import { task } from "../../services/task.service";

interface ITaskState {
    tasks: ITask[],
    currentTask: ITask | null
    modal: string
}

const initialState: ITaskState = {
    tasks: [],
    currentTask: null,
    modal: ''
}

export const getAllTasks = createAsyncThunk(
    'task',
    async (relatedTable: string) => {
        const response = await task.getCurrentBoardTasks(relatedTable)
        return response.data
    }
)

export const createTask = createAsyncThunk(
    'task',
    async (task: ITask) => {
        await task.createTask(task); 
        return "Success!"
    }
)

export const updateTask = createAsyncThunk(
    'task',
    async (data: {id: string, task: ITask}) => {
        const response = await task.updateTask(data.id, data.task)
        return response.data
    }
)

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setCurrentTask: (state, action) => {
            state.currentTask = action.payload;
        },
        setModal: (state, action) => {
            state.modal = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllTasks.fulfilled, (state, action) => {
            state.tasks = action.payload
        })
    }
})

const { actions, reducer: taskReducer } = taskSlice

const taskActions = {
    ...actions,
    getAllTasks,
    updateTask,
    createTask
}

export { taskActions, taskReducer }