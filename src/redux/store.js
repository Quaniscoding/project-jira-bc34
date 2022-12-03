import { configureStore } from '@reduxjs/toolkit'
import userLogin from './reducers/users/userLogin'
import userSignUp from './reducers/users/userSignUp'
import getUser from './reducers/users/getUser'
import getAllProject from './reducers/projects/getAllProject'
import getProjectCategory from './reducers/projects/getProjectCategory'
import getProjectDetail from './reducers/projects/getProjectDetail'
import updateProject from './reducers/projects/updateProject'
export const store = configureStore({
    reducer: {
        userLogin,
        userSignUp,
        getAllProject,
        getUser,
        getProjectCategory,
        getProjectDetail,
        updateProject
    },
})