import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const deleteUserFromProject = createSlice({
    name: "deleteUserFromProject",
    initialState,
    reducers: {}
});

export const { } = deleteUserFromProject.actions

export default deleteUserFromProject.reducer

export const callDeleteUserFromProject = (data) => async () => {
    try {
        const apiDeleteUserFromProject = await http.post("/Project/removeUserFromProject", data);
        alert(apiDeleteUserFromProject.data.content)
    } catch (err) {
        alert(err.response.data.content)
    }
}