import db from '../models';

//Get all categories
export const getAllMenusService = (permis) => new Promise(async (resolve, reject) => {
    try {
        const whereClause = {};
        if (permis) whereClause.idPermission = permis;
        const response = await db.Menu.findAll({
            include: [
                { model: db.Permission, as: 'permissions' },
            ],
            where: whereClause,
            raw: true
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get menu',
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const createMenusService = ({ url, name, idPermission }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Menu.create({
            url,
            name,
            idPermission,
            include: [
                { model: db.Permission, as: 'permissions' },
            ],
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Tạo menu thành công.' : 'Tạo menu không thành công',
            response: response || null
        });
    } catch (error) {
        reject(error)
    }
})

export const deleteMenusService = (id) => new Promise(async (resolve, reject) => {
    try {
        const whereClause = {};
        whereClause.id = id;
        const response = await db.Menu.findOne({
            include: [
                { model: db.Permission, as: 'permissions' },
            ],
            where: whereClause,
            // raw: true
        });
        await response.destroy();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Xoá menu thành công' : 'Xoá menu không thành công!',
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const updateMenusService = ({ id, url, name, idPermission }) => new Promise(async (resolve, reject) => {
    try {
        const menu = await db.Menu.findByPk(id);
        
        const response = await menu.update({
            url,
            name,
            idPermission,
        });
        
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Cập nhật menu thành công.' : 'Cập nhật menu không thành công',
            response: response || null
        });
    } catch (error) {
        reject(error);
    }
})