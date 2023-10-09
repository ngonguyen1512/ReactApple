import actionTypes from "../actions/actionTypes";
const initState = {
    msg: '',
    countcad: 0,
    countadmits:[],
}

const admitReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_COUNT_ADMIT:
            return {
                ...state,
                msg: action.msg || '',
                countcad: action.countcad || 0
            } 
        default:
            return state;
    }

}

export default admitReducer;