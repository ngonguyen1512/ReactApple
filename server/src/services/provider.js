import db from '../models';

//Get all categories
export const getAllProvidersService = (page) => new Promise(async(resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const response = await db.Provider.findAndCountAll({
            offset: offset * +process.env.LIMIT_PROVIDER,
            limit: +process.env.LIMIT_PROVIDER,
            order: [['createdAt', 'DESC']],
            raw: true,
            nest: true,
        });
        resolve({
            err: response? 0 : 1,
            msg: response ? 'OK' : 'Failed to get provider',
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const createProvidersService = ({ name, phone, email, address, state }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Provider.create({
            name,
            phone,
            email,
            address,
            state
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Tạo nhà cung cấp thành công.' : 'Tạo nhà cung cấp không thành công',
            response: response || null
        });
    } catch (error) {
        reject(error)
    }
})

export const updateProvidersService = ({ id, name, state }) => new Promise(async (resolve, reject) => {
    try {
        const provider = await db.Provider.findByPk(id);

        const response = await provider.update({
            state
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Cập nhật nhà cung cấp thành công.' : 'Cập nhật nhà cung cấp không thành công',
            response: response || null
        });
    } catch (error) {
        reject(error);
    }
})