import { configureStore } from '@reduxjs/toolkit'
import userLogin from './reducers/users/userLogin'
import userSignUp from './reducers/users/userSignUp'
export const store = configureStore({
    reducer: {
        userLogin,
        userSignUp
    },
})