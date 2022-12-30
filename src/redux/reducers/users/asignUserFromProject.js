import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
}

const asignUserFromProJet = createSlice({
    name: "asignUserFromProJet",
    initialState,
});

export const { } = asignUserFromProJet.actions

export default asignUserFromProJet.reducer

export const callAsignUserFromProject = (data) => async () => {
    try {
        const apiAsignUserFromProject = await http.post("/Project/assignUserProject", data);
        return { isAsign: true }
    } catch (err) {
        console.log(err.response.data.content);
        console.log(err);
        if (err.response.data.statusCode == 500) {
            return { isAsign: false }
        }
        else {
            return { isUnthor: true }
        }
    }
}