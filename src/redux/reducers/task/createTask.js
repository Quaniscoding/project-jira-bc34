import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const createTask = createSlice({
    name: "createTask",
    initialState,
    reducers: {}
});

export const { } = createTask.actions

export default createTask.reducer
export const callCreateTask = (data) => async () => {
    try {
        const apiCreateTask = await http.post("/Project/createTask", data)
        return { isCreate: true }
    } catch (err) {
        console.log(err);
        if (err.response.data.statusCode == 403) {
            return { isUnthor: true }
        }
        else {
            return { isCreate: false }
        }
    }
}