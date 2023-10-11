import actionTypes from "./actionTypes";
import * as apis from '../../services'

export const getCountInvoices = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCountInvoices();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_COUNT_INVOICE,
                invoices: response.data.response?.rows,
                countci: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_COUNT_INVOICE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_COUNT_INVOICE,
            data: null,
        })
    }
}

export const createInvoices = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateInvoices(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_INVOICE_SUCCESS,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_INVOICE_FAIL,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_INVOICE_FAIL,
            msg: 'Failed to create invoice.',
        });
    }
};

export const getInvoicesByIdAccount = (payloadid) => async (dispatch) => {
    try {
        const response = await apis.apiGetInvoicesByIdAccount(payloadid);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_INVOICE_BY_ID,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.GET_INVOICE_BY_ID,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_INVOICE_BY_ID,
            msg: 'Failed to get invoice.',
        });
    }
};