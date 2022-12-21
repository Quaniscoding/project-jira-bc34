import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const asignUserFromProJet = createSlice({
    name: "asignUserFromProJet",
    initialState,
    reducers: {}
});

export const { } = asignUserFromProJet.actions

export default asignUserFromProJet.reducer

export const callAsignUserFromProject = (data) => async () => {
    try {
        const apiAsignUserFromProject = await http.post("/Project/assignUserProject", data);
        alert(apiAsignUserFromProject.data.content);
        return apiAsignUserFromProject
    } catch (err) {
        alert(err.response.data.content)
    }
}