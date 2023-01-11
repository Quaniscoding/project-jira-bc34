import { createSlice } from '@reduxjs/toolkit'
import { http } from '../../../utils/baseUrl';

const initialState = {

}

const editComments = createSlice({
    name: "editComments",
    initialState,
    reducers: {}
});

export const { } = editComments.actions

export default editComments.reducer
export const callEditComments = (data) => async () => {
    try {
        const apiEditComments = await http.put(`/Comment/updateComment?id=${data.id}&contentComment=${data.contentCommentEdit}`)
        return { isEdit: true }
    } catch (error) {
        return { isEdit: false }
    }
}