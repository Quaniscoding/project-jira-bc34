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
        const apiCreateProject = await http.post("/Project/createProjectAuthorize", data)
        history.push("/projectmanagement")
        return { isCreate: true }
    } catch (err) {
        if (err.response.data.statusCode == 500) {
            return { isExist: true }
        }
        else {
            return { isCreate: false }
        }
    }
}