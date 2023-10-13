import axiosConfig from '../axiosConfig'

export const apiGetCountAdmits = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `api/v1/admit/count`,
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiCreateAdmits = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/admit/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});