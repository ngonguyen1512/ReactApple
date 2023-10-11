import actionTypes from "../actions/actionTypes";
const initState = {
    msg: '',
    invoices: [],
    countci: 0,
}

const invoiceReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_COUNT_INVOICE:
            return {
                ...state,
                msg: action.msg || '',
                invoices: action.invoices,
                countci: action.countci || 0
            }
        case actionTypes.CREATE_INVOICE_SUCCESS:
            return {
                ...state,
                invoices: action.data,
                msg: action.msg || '',
            }

        case actionTypes.CREATE_INVOICE_FAIL:
            return {
                ...state,
                msg: action.msg || '',
            }
        case actionTypes.GET_INVOICE_BY_ID:
            return {
                ...state,
                msg: action.msg || '',
                invoices: action.data,
            }
        default:
            return state;
    }

}

export default invoiceReducer;