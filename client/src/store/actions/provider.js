import actionTypes from "./actionTypes";
import * as apis from '../../services'

export const getProviders = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetProviders(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PROVIDER,
                providers: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_PROVIDER,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PROVIDER,
            providers: null,
        })
    }
}

export const createProviders = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateProviders(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_PROVIDER_SUCCESS,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_PROVIDER_FAIL,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_PROVIDER_FAIL,
            msg: 'Failed to create provider.',
        });
    }
};

export const updateProviders = (payloadu) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateProviders(payloadu);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_PROVIDER,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_PROVIDER,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_PROVIDER,
            data: null,
        })
    }
}