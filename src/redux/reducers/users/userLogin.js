import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';
import { saveStringLocal } from '../../../utils/config';
import { USER_LOGIN } from '../../../utils/constant';

const initialState = {

}

const userLogin = createSlice({
    name: "userLogin",
    initialState,
    reducers: {}
});

export const { } = userLogin.actions

export default userLogin.reducer

export const callLogin = (userLogin) => async () => {
    try {
        const apiLogin = await http.post("Users/signin", userLogin)
        saveStringLocal(USER_LOGIN, apiLogin.data.content.accessToken
        )
        alert(apiLogin.data.message)
    } catch (err) {
        alert(err.response.data.message)
    }
}