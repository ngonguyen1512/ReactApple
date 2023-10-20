import db from '../models';

//Get all categories
export const getAllLikesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Like.findAndCountAll({
            order: [['updatedAt', 'DESC']],
            raw: true,
            nest: true,
            include: [
                { model: db.Account, as: 'like_account' },
                { model: db.Product, as: 'like_product' }
            ],
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get like',
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const createLikesService = ({ idAccount, idProduct }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Like.create({
            idAccount,
            idProduct
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Like the successful product.' : 'Like the product is not successful.',
            response: response || null
        });
    } catch (error) {
        reject(error)
    }
})