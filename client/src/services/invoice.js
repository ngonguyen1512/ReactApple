import axiosConfig from '../axiosConfig'

export const apiGetCountInvoices = () => new Promise(async (resolve, reject) => {
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

export const apiCreateInvoices = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'api/v1/invoice/create',
            data: payload,
        });
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetInvoicesByIdAccount = (payloadid) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `api/v1/invoice/invoicebyid`,
            data: payloadid,
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});