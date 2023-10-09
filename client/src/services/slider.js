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