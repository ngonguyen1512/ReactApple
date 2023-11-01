import axiosConfig from "../axiosConfig";

export const apiGetSliders = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/slider/all',
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateSliders = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/slider/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiDeleteSliders = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: 'api/v1/slider/delete',
            data: payload
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateSliders = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/slider/update',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})