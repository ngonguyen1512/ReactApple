import db from '../models';

//Get all categories
export const getAllLikesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Like.findAll({
            order: [['updatedAt', 'DESC']],
            include: [
                { model: db.Account, as: 'like_account' },
                { model: db.Product, as: 'like_product', include: [{ model: db.Category, as: 'categories', attributes: ['name'] }] }
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

export const deleteLikesService = ({ idAccount, idProduct }) => new Promise(async (resolve, reject) => {
    try {
        const whereClause = {};
        whereClause.idAccount = idAccount;
        whereClause.idProduct = idProduct;
        const response = await db.Like.findOne({
            where: whereClause,
        });
        await response.destroy();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Delete like successful' : 'Delete like is not successful!',
            response
        });
    } catch (error) {
        reject(error);
    }
});