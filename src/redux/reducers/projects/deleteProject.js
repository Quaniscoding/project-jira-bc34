import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const deleteProject = createSlice({
    name: "deleteProject",
    initialState,
    reducers: {}
});

export const { } = deleteProject.actions

export default deleteProject.reducer

export const callDeleteProject = (idProject) => async () => {
    try {
        const apiDeleteProject = await http.delete(`/Project/deleteProject?projectId=${idProject}`);
        return { isDelete: true }
    } catch (err) {
        return { isDelete: false }
    }
}