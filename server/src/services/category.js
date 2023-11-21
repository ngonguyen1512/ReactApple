import db from '../models';

//Get all categories
export const getAllCategoriesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.findAll({
            raw: true
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get category',
            response
        });
    } catch (error) { reject(error) }
});

export const getLimitCategoriesService = (page) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const response = await db.Category.findAndCountAll({
            offset: offset * +process.env.LIMIT_CATEGORY,
            limit: +process.env.LIMIT_CATEGORY,
            order: [['updatedAt', 'DESC']],
            raw: true,
            nest: true,
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get category',
            response
        });
    } catch (error) { reject(error) }
});

export const createCategoriesService = ({ name, image, state }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.create({
            name,
            image,
            state
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Create a successful product type.' : 'Create failed product type.',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const updateCategoriesService = ({ id, name, image, state }) => new Promise(async (resolve, reject) => {
    try {
        const category = await db.Category.findByPk(id);
        const response = await category.update({
            name,
            image,
            state
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Successful product type update.' : 'Product type update failed.',
            response: response || null
        });
    } catch (error) { reject(error) }
})