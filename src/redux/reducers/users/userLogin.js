import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';
import { saveLocal, saveStringLocal } from '../../../utils/config';
import { DATA_USER, USER_LOGIN } from '../../../utils/constant';
import { history } from '../../../utils/history';

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
        saveLocal(DATA_USER, apiLogin.data.content)
        history.push('/projectmanagement')
    } catch (err) {
        return new Promise((resolve, reject) =>
            resolve({ isError: true }));
    }
}