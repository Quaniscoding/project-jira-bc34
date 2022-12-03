import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios';
import { http } from '../../../utils/baseUrl';

const initialState = {
    projectCategory: []
}

const getProjectCategory = createSlice({
    name: "getProjectCategory",
    initialState,
    reducers: {
        getListProjectCategory: (state, { type, payload }) => {
            state.projectCategory = payload
        }
    }
});

export const { getListProjectCategory } = getProjectCategory.actions

export default getProjectCategory.reducer
export const callGetProjectCategory = async (dispatch) => {
    try {
        const apiGetProjectCategory = await axios({
            method: "GET",
            url: "https://jiranew.cybersoft.edu.vn/api/ProjectCategory",
            headers: {
                TokenCybersoft:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzNCIsIkhldEhhblN0cmluZyI6IjI3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MjU1MzYwMDAwMCIsIm5iZiI6MTY1MzU4NDQwMCwiZXhwIjoxNjgyNzAxMjAwfQ.WXYIKeb4x0tXpYflgrnKFbivOnuUdLmKcgl7Xr0MD3I",
            },
        })
        dispatch(getListProjectCategory(apiGetProjectCategory.data.content))
    } catch (err) {
        console.log(err);
    }
}