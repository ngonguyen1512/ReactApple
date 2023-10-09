import actionTypes from "../actions/actionTypes";
const initState = {
    msg: '',
    countci: 0,
    countinvoices: [],
}

const invoiceReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_COUNT_INVOICE:
            return {
                ...state,
                msg: action.msg || '',
                countci: action.countci || 0
            }
        default:
            return state;
    }

}

export default invoiceReducer;