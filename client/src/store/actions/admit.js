import actionTypes from "./actionTypes";
import * as apis from '../../services'

export const getCountAdmits = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCountAdmits();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_COUNT_ADMIT,
                countadmits: response.data.response?.rows,
                countcad: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_COUNT_ADMIT,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_COUNT_ADMIT,
            data: null,
        })
    }
}

export const createAdmits = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateAdmits(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_ADMIT_SUCCESS,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_ADMIT_FAIL,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_ADMIT_FAIL,
            msg: 'Failed to create admit.',
        });
    }
};