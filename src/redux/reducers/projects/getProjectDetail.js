import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {
    listProjectDetail: []
}

const getProjectDetail = createSlice({
    name: "getProjectDetail",
    initialState,
    reducers: {
        getListProjectDetail: (state, { type, payload }) => {
            state.listProjectDetail = payload;
        }
    }
});

export const { getListProjectDetail } = getProjectDetail.actions

export default getProjectDetail.reducer
export const callGetListProjectDetail = (idProject) => async (dispatch) => {
    try {
        const apiGetProjectDetail = await http.get(`/Project/getProjectDetail?id=${idProject}`)
        dispatch(getListProjectDetail(apiGetProjectDetail.data.content));
    } catch (err) {
        console.log(err);
    }
}
