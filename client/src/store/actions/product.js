import actionTypes from './actionTypes';
import * as apis from '../../services/product';

export const getProducts = () => async (dispatch) => {
    try {
        const response = await apis.apiGetProducts();
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PRODUCTS,
                productall: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_PRODUCTS,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCTS,
            data: null,
        })
    }
}

export const getProductsLimit = (query) => async (dispatch) => {
    try {
        const response = await apis.apiGetProductsLimit(query);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_PRODUCTS_LIMIT,
                products: response.data.response?.rows,
                countp: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_PRODUCTS_LIMIT,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRODUCTS_LIMIT,
            data: null,
        })
    }
}
export const getNewProducts = () => async (dispatch) => {
    try {
        const response = await apis.apiGetNewProducts()
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.GET_NEW_PRODUCTS,
                newProducts: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.GET_NEW_PRODUCTS,
                msg: response.data.msg,
                newProducts: null
            })
        }

    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_PRODUCTS,
            newProducts: null
        })
    }
}

export const createProducts = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiCreateProducts(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.CREATE_PRODUCT_SUCCESS,
                data: response.data.response,
            });
        } else {
            dispatch({
                type: actionTypes.CREATE_PRODUCT_FAIL,
                msg: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: actionTypes.CREATE_PRODUCT_FAIL,
            msg: 'Failed to create product.',
        });
    }
};

export const updateProducts = (payload) => async (dispatch) => {
    try {
        const response = await apis.apiUpdateProducts(payload);
        if (response?.data.err === 0) {
            dispatch({
                type: actionTypes.UPDATE_PRODUCT,
                data: response.data.response,
            })
        } else {
            dispatch({
                type: actionTypes.UPDATE_PRODUCT,
                msg: response.data.msg,
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.UPDATE_PRODUCT,
            data: null,
        })
    }
}
