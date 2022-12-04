import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';
import { history } from '../../../utils/history';
const initialState = {
    dataProject: {}
}
const createProject = createSlice({
    name: "createProject",
    initialState,
    reducers: {
        getDataProject: (state, { type, payload }) => {
            {
                state.dataProject = payload
            }
        }
    }
});

export const { getDataProject } = createProject.actions

export default createProject.reducer

export const callCreateProject = (data) => async () => {
    try {
        console.log(data);
        const apiCreateProject = await http.post("/Project/createProjectAuthorize", data)
        history.push("/projectmanagement")
        alert(`Create project ${apiCreateProject.data.content.projectName} success!`)
    } catch (err) {
        alert(err.response.data.content);
    }
}