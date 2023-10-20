import actionTypes from "./actionTypes";
import * as apis from '../../services'

export const getLikes = () => async (dispatch) => {
    try {
        const response = await apis.apiGetLikes();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_LIKE,
                likes: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_LIKE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_LIKE,
            likes: null,
        })
    }
}

export const createLikes = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateLikes(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_LIKE_SUCCESS,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_LIKE_FAIL,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_LIKE_FAIL,
            msg: 'Failed to create like.',
        });
    }
};