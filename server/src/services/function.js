import db from '../models';

//Get all categories
export const getAllFunctionsService = (permis) => new Promise(async (resolve, reject) => {
    try {
        let response;
        if (permis) {
            response = await db.Function.findAll({
                attributes: ['id', 'name', 'idPermission'],
                include: [
                    { model: db.Permission, as: 'functionPermission', attributes: ['id', 'name'] },
                ],
                where: { idPermission: permis },
                raw: true
            });
        } else {
            resolve({
                err: 1,
                msg: 'You do not have access.',
                response: [],
            });
            return;
        }
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get function',
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const getAllsFunctionsService = () => new Promise(async (resolve, reject) => {
    try {
        let response = await db.Function.findAll({
            attributes: ['id', 'name', 'idPermission'],
            include: [
                { model: db.Permission, as: 'functionPermission', attributes: ['id', 'name'] },
            ],
            raw: true
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get function',
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const createFunctionService = ({ name, idPermission }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Function.create({
            name,
            idPermission,
            include: [
                { model: db.Permission, as: 'functionPermission' },
            ],
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Tạo chức năng thành công.' : 'Tạo chức năng không thành công',
            response: response || null
        });
    } catch (error) {
        reject(error)
    }
})

export const deleteFunctionService = (id) => new Promise(async (resolve, reject) => {
    try {
        const whereClause = {};
        whereClause.id = id;
        const response = await db.Function.findOne({
            include: [
                { model: db.Permission, as: 'functionPermission' },
            ],
            where: whereClause,
            // raw: true
        });
        await response.destroy();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Xoá chức năng thành công' : 'Xoá chức năng không thành công!',
            response
        });
    } catch (error) {
        reject(error);
    }
});



export const updateFunctionsService = ({ id, name, idPermission }) => new Promise(async (resolve, reject) => {
    try {
        const functions = await db.Function.findByPk(id);
        if (!functions) {
            resolve({
                err: 1,
                msg: 'Không tìm thấy function',
                response: null
            });
            return;
        }

        const response = await functions.update({
            name,
            idPermission,
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Cập nhật chức năng thành công.' : 'Cập nhật chức năng không thành công',
            response: response || null
        });
    } catch (error) {
        reject(error);
    }
})
