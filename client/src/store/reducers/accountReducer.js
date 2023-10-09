import actionTypes from "../actions/actionTypes";
const initState = {
    accounts: [],
    msg: '',
    update: false,
    counta: 0,
    countca: 0,
    countaccounts:[],
    accountone: [],
}

const accountReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_ACCOUNT:
            return {
                ...state,
                accounts: action.accounts || [],
                msg: action.msg || '',
                counta: action.counta || 0
            } 
        case actionTypes.GET_ACCOUNTS_ONE:
            return {
                ...state,
                accountone: action.accountone || [],
                msg: action.msg || '',
            } 
        case actionTypes.GET_COUNT_ACCOUNT:
            return {
                ...state,
                countaccounts: action.accounts || [],
                msg: action.msg || '',
                countca: action.countca || 0
            } 
        case actionTypes.UPDATE_STATE_ACCOUNT:
            return {
                ...state,
                accounts: action.data,
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_INFO_ACCOUNT:
            return {
                ...state,
                accounts: action.data,
                msg: action.msg || '',
            }
        default:
            return state;
    }

}

export default accountReducer;