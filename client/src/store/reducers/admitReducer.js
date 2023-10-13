import actionTypes from "../actions/actionTypes";
const initState = {
    msg: '',
    countcad: 0,
    admits: [],
}

const admitReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_COUNT_ADMIT:
            return {
                ...state,
                msg: action.msg || '',
                countcad: action.countcad || 0
            } 
        case actionTypes.CREATE_ADMIT_SUCCESS:
            return {
                ...state,
                admits: action.data,
                msg: action.msg || '',
            }
        case actionTypes.CREATE_ADMIT_FAIL:
            return {
                ...state,
                msg: action.msg || '',
            }
        default:
            return state;
    }

}

export default admitReducer;