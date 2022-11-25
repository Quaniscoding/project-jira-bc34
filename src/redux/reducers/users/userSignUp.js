import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';
import { history } from '../../../utils/history';
const initialState = {

}
const userSignUp = createSlice({
    name: "userSignUp",
    initialState,
    reducers: {}
});

export const { } = userSignUp.actions

export default userSignUp.reducer

export const callSignUp = (userLogin) => async () => {
    try {
        const apiLogin = await http.post("Users/signup", userLogin)
        history.push("/login")
        alert(apiLogin.data.message)
    } catch (err) {
        alert(err.response.data.message);
    }
}