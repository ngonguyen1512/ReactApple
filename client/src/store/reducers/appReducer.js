import actionTypes from "../actions/actionTypes";
const initState = {
    categories: [],
    samples: [],
    prices: [],
    msg: '',
    sliders: [],
    typesamples: [],
    providers: [],
    limitcategories: [],
    limitsamples: [],
    count: 0,
}

const appReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES:
            return {
                ...state,
                categories: action.categories || [],
                msg: action.msg || '',
            }
        case actionTypes.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                categories: action.data,
                msg: action.msg || '',
            }

        case actionTypes.CREATE_CATEGORY_FAIL:
            return {
                ...state,
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_CATEGORY:
            return {
                ...state,
                categories: action.data,
                msg: action.msg || '',
            }
        case actionTypes.GET_SAMPLES:
            return {
                ...state,
                samples: action.samples,
                msg: action.msg || '',
            }
        case actionTypes.CREATE_SAMPLE_SUCCESS:
            return {
                ...state,
                samples: action.data,
                msg: action.msg || '',
            }
        case actionTypes.CREATE_SAMPLE_FAIL:
            return {
                ...state,
                msg: action.msg || '',
            }
        case actionTypes.UPDATE_SAMPLE:
            return {
                ...state,
                samples: action.data,
                msg: action.msg || '',
            }
        case actionTypes.GET_CATEGORIES_LIMIT:
            return {
                ...state,
                limitcategories: action.limitcategories || [],
                msg: action.msg || '',
                count: action.count || 0
            }
        case actionTypes.GET_CATEGORY_SAMPLES: 
            return {
                ...state,
                samples: action.data,
                msg: action.msg || '',
            }
        case actionTypes.GET_SAMPLES_LIMIT:
            return {
                ...state,
                limitsamples: action.limitsamples || [],
                msg: action.msg || '',
                count: action.count || 0
            }
        case actionTypes.GET_TYPE_SAMPLES:
            return {
                ...state,
                typesamples: action.typesamples || [],
                msg: action.msg || '',
            }
        case actionTypes.GET_PRICES:
            return {
                ...state,
                prices: action.prices || [],
                msg: action.msg || '',
            }
        case actionTypes.GET_SLIDERS:
            return {
                ...state,
                sliders: action.sliders || [],
                msg: action.msg || '',
            }
        default:
            return state;
    }

}

export default appReducer;