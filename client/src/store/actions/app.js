import actionTypes from './actionTypes';
import * as apis from '../../services';

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCategories();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                categories: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            categories: null,
        })
    }
}

export const getLimitCategories = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetLimitCategories(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CATEGORIES_LIMIT,
                limitcategories: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_CATEGORIES_LIMIT,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORIES_LIMIT,
            categories: null,
        })
    }
}

export const createCategories = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateCategories(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_CATEGORY_SUCCESS,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_CATEGORY_FAIL,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_CATEGORY_FAIL,
            msg: 'Failed to create category.',
        });
    }
};

export const updateCategories = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateCategories(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_CATEGORY,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_CATEGORY,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_CATEGORY,
            data: null,
        })
    }
}

export const getSamples = () => async (dispatch) => {
    try {
        const response = await apis.apiGetSamples();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_SAMPLES,
                samples: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_SAMPLES,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_SAMPLES,
            samples: null,
        })
    }
}

export const createSamples = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateSamples(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_SAMPLE_SUCCESS,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_SAMPLE_FAIL,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_SAMPLE_FAIL,
            msg: 'Failed to create sample.',
        });
    }
};

export const updateSamples = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateSamples(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_SAMPLE,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_SAMPLE,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_SAMPLE,
            data: null,
        })
    }
}

export const getLimitSamples = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetLimitSamples(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_SAMPLES_LIMIT,
                limitsamples: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_SAMPLES_LIMIT,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_SAMPLES_LIMIT,
            samples: null,
        })
    }
}

export const getTypeSamples = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetTypeSamples(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_TYPE_SAMPLES,
                typesamples: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_TYPE_SAMPLES,
                msg: response.data.msg,
                typesamples: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_TYPE_SAMPLES,
            typesamples: null,
        })
    }
}

export const getPrices = () => async (dispatch) => {
    try {
        const response = await apis.apiGetPrices();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PRICES,
                prices: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_PRICES,
                msg: response.data.msg,
                prices: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRICES,
            prices: null,
        })
    }
}

export const getSliders = () => async (dispatch) => {
    try {
        const response = await apis.apiGetSliders();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_SLIDERS,
                sliders: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_SLIDERS,
                msg: response.data.msg,
                sliders: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_SLIDERS,
            sliders: null,
        })
    }
}

export const getCategorySamples = (payloads) => async (dispatch) => {
    try {
        const response = await apis.apiGetCategorySamples(payloads);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_CATEGORY_SAMPLES,
                data: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_CATEGORY_SAMPLES,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORY_SAMPLES,
            data: null,
        })
    }
}
