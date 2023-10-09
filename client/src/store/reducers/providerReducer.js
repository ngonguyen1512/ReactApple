import actionTypes from "../actions/actionTypes";
const initState = {
    providers: [],
    msg: '',
    count: 0,
}

const functionReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROVIDER:
            return {
                ...state,
                providers: action.providers || [],
                msg: action.msg || '',
                count: action.count || 0
            } 
        case actionTypes.CREATE_PROVIDER_SUCCESS:
            return {
                ...state,
                providers: action.data,
                msg: action.msg || '',
            }
        case actionTypes.CREATE_PROVIDER_FAIL:
            return {
                ...state,
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_PROVIDER:
            return {
                ...state,
                providers: action.data,
                msg: action.msg || '',
            }
        default:
            return state;
    }

}

export default functionReducer;