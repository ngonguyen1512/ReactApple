import actionTypes from "../actions/actionTypes";
const initState = {
    likes: [],
    msg: '',
}

const likeReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_LIKE:
            return {
                ...state,
                likes: action.likes,
                msg: action.msg || '',
            }
        case actionTypes.CREATE_LIKE_SUCCESS:
            return {
                ...state,
                likes: action.data,
                msg: action.msg || '',
            }
        case actionTypes.CREATE_LIKE_FAIL:
            return {
                ...state,
                msg: action.msg || '',
            }
        default:
            return state;
    }

}

export default likeReducer;