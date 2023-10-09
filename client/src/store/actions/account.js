import actionTypes from "./actionTypes";
import * as apis from '../../services'

export const getAccounts = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetAccounts(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ACCOUNT,
                accounts: response.data.response?.rows,
                counta: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_ACCOUNT,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ACCOUNT,
            data: null,
        })
    }
}

export const getCountAccounts = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCountAccounts();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_COUNT_ACCOUNT,
                countaccounts: response.data.response?.rows,
                countca: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_COUNT_ACCOUNT,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_COUNT_ACCOUNT,
            data: null,
        })
    }
}

export const updateStateAccount = (payloadu) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateStateAccount(payloadu);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_STATE_ACCOUNT,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_STATE_ACCOUNT,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_STATE_ACCOUNT,
            data: null,
        })
    }
}

export const updateInfoAccount = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateInfoAccount(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_INFO_ACCOUNT,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_INFO_ACCOUNT,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_INFO_ACCOUNT,
            data: null,
        })
    }
}

export const getAccountOne = () => async (dispatch) => {
    try {
        const response = await apis.apiGetAccountOne();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_ACCOUNTS_ONE,
                accountone: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_ACCOUNTS_ONE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_ACCOUNTS_ONE,
            data: null,
        })
    }
}