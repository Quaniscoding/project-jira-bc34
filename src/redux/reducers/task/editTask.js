import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const editTask = createSlice({
    name: "editTask",
    initialState,
    reducers: {}
});

export const { } = editTask.actions

export default editTask.reducer
export const callEditTask = (data) => async () => {
    try {
        const apiEditTask = await http.post(`/Project/updateTask`, data)
        return { isUpdate: true }
    } catch (error) {
        console.log(error);
        return { isUpdate: false }
    }
}