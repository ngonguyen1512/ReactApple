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