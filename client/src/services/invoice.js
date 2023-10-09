import axiosConfig from '../axiosConfig'

export const apiGetCountInvoices = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `api/v1/invoice/count`,
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});