import axiosConfig from '../axiosConfig'

export const apiGetAccounts = (query) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `api/v1/account/all`,
            params: query
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiGetCountAccounts = () => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `api/v1/account/count`,
        })
        resolve(response);
    } catch (error) {
        reject(error);
    }
});

export const apiUpdateStateAccount = (payloadu) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/account/updatestate',
            data: payloadu
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiUpdateInfoAccount = (payload) => new Promise(async(resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: 'api/v1/account/updateinfo',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiGetAccountOne = () =>new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: 'api/v1/account/one',
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})