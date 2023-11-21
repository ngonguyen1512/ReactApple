import db from '../models';
const { Op } = require("sequelize")

export const getAllPermissionService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Permission.findAll({
            attributes: ['id', 'name'],
            where: { id: { [Op.not]: 4 } },
            order: [['updatedAt', 'DESC']],
            raw: true
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get category',
            response
        });
    } catch (error) { reject(error); }
});