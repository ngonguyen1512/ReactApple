import db from '../models';

export const getCountAdmitService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Admit.findAndCountAll({
            // attributes: ['id', 'name','image'], 
            raw: true,
            nest: true,
            order: [['updatedAt', 'DESC']],
        });
        resolve({
            err: response? 0 : 1,
            msg: response ? 'OK' : 'Failed to get Admit',
            response
        });
    } catch (error) {
        reject(error)
    }
})