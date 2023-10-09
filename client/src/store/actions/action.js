import actionTypes from "./actionTypes";

export const selectProducts = (product) => {
    return {
        type: actionTypes.SELECT_PRODUCTS,
        payload: product
    }
}
export const deleteProducts = (product) => {
    return {
        type: actionTypes.DELETE_PRODUCTS,
        payload: product
    }
}