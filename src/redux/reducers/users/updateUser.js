import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';
import { history } from '../../../utils/history';

const initialState = {

}

const updateUser = createSlice({
    name: "updateUser",
    initialState,
    reducers: {}
});

export const { } = updateUser.actions

export default updateUser.reducer
export const callUpdateUser = (data) => async () => {
    try {
        const apiUpdateUser = await http.put("/Users/editUser", data)
        history.push("/user")
        return { isUpdate: true }
    } catch (err) {
        return { isUpdate: false }
    }
}