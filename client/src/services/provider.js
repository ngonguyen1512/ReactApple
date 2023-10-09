import axiosConfig from "../axiosConfig";

export const apiGetProviders = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/provider/all',
            params: query,
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateProviders = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/provider/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateProviders = (payloadu) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/provider/update',
            data: payloadu
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})