import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const deleteTask = createSlice({
    name: 'deleteTask',
    initialState,
    reducers: {}
});

export const { } = deleteTask.actions

export default deleteTask.reducer
export const callDeleteTask = (taskId) => async () => {
    try {
        const apiDeleteTask = await http.delete(`/Project/removeTask?taskId=${taskId}`)
        return { isDelete: true }
    } catch (error) {
        console.log(error);
        return { isDelete: false }

    }
}