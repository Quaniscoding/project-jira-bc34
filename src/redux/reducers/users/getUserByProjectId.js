import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    listUser: []
}

const getUserByProjectId = createSlice({
    name: "getUserByProjectId",
    initialState,
    reducers: {
        getListUserByProjectId: (state, { type, payload }) => {
            state.listUser = payload;
        }
    }
});

export const { getListUserByProjectId } = getUserByProjectId.actions

export default getUserByProjectId.reducer
export const callGetListUserByProjectId = (id) => async (dispatch) => {
    try {
        const apiGetListUserByProjectId = await http.get(`/Users/getUserByProjectId?idProject=${id}`);
        dispatch(getListUserByProjectId(apiGetListUserByProjectId.data.content));
        return { isUserAsign: true }
    } catch (err) {
        console.log(err);
        if (err.response.status == 404) {
            console.log("No user asign !");
            return { isUserAsign: false }
        };
    }
}
