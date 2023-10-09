import axiosConfig from "../axiosConfig";

export const apiGetCategories = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/category/all',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetLimitCategories = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/category/limit',
            params: query,
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateCategories = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/category/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateCategories = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/category/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})