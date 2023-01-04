import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const deleteUser = createSlice({
    name: "deleteUser",
    initialState,
    reducers: {}
});

export const { } = deleteUser.actions

export default deleteUser.reducer
export const callDeleteUser = (userId) => async () => {
    try {
        const apiDeleteUser = await http.delete(`/Users/deleteUser?id=${userId}`)
        return { isDelete: true }
    } catch (error) {
        if (error.response.data.statusCode = 400) {
            return { isCreateProject: true }
        }
        else {
            return { isDelete: false }
        }
    }
}
