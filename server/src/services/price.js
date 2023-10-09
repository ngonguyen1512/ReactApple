import db from '../models';

//Get all categories
export const getAllPricesService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Prices.findAll({
            attributes: ['id', 'code', 'value'], 
            // where: {state: '1'},
            raw: true
        });
        resolve({
            err: response? 0 : 1,
            msg: response ? 'OK' : 'Failed to get price',
            response
        });
    } catch (error) {
        reject(error);
    }
});