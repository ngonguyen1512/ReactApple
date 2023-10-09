import db from '../models';

//Get current login
export const getOneService = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Account.findOne({
            where: {id}, 
            attributes: ['id', 'name', 'email', 'phone', 'idPermission'], 
           
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