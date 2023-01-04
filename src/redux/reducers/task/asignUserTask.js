import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const asignUserTask = createSlice({
    name: "asignUserTask",
    initialState,
    reducers: {}
});

export const { } = asignUserTask.actions

export default asignUserTask.reducer

export const callAsignUserTask = (data) => async () => {
    try {
        const apiAsignUserTask = await http.post('/Project/assignUserTask', data)
        return { isAsign: true }
    } catch (error) {
        console.log(error);
        return { isAsign: false }
    }
}