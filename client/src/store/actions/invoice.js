import actionTypes from "./actionTypes";
import * as apis from '../../services'

export const getCountInvoices = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCountInvoices();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_COUNT_INVOICE,
                countinvoices: response.data.response?.rows,
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