import axiosConfig from "../axiosConfig";

export const apiGetSamples = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/sample/all',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetLimitSamples = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/sample/limit',
            params: query,
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetTypeSamples = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/sample/type',
            params: query,
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetCategorySamples = (payloads) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/sample/group',
            data: payloads,
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateSamples = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/sample/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateSamples = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/sample/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})