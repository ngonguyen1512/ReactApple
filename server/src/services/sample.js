import db from '../models';

//Get all categories
export const getAllSamplesService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Sample.findAll({
            raw: true,
            include: [
                {model: db.Category, as: 'categoriesmodel', attributes: ['name']},
            ],
        });
        resolve({
            err: response? 0 : 1,
            msg: response ? 'OK' : 'Failed to get category',
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const getLimitSamplesService = (page) => new Promise(async(resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        
        const response = await db.Sample.findAndCountAll({
            offset: offset * +process.env.LIMIT_SAMPLE,
            limit: +process.env.LIMIT_SAMPLE,
            raw: true,
            nest: true,
            include: [
                {model: db.Category, as: 'categoriesmodel', attributes: ['name']},
            ],
        });
        resolve({
            err: response? 0 : 1,
            msg: response ? 'OK' : 'Failed to get category',
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const getTypeSamplesService = (query) => new Promise(async(resolve, reject) => {
    try {
        const whereClause = {  };
        if(query) whereClause.name = query;

        const whereSample = { state: '1' };

        const response = await db.Sample.findAll({
            raw: true,
            where: whereSample,
            include: [
                {model: db.Category, as: 'categoriesmodel', attributes: ['name'], where: whereClause,},
            ],
            
        });
        resolve({
            err: response? 0 : 1,
            msg: response ? 'OK' : 'Failed to get category',
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const getCategorySamplesService = (idCategory) => new Promise(async(resolve, reject) =>{
    try {
        const whereClause = {}
        whereClause.idCategory = idCategory
        const response = await db.Sample.findAll({
            where: whereClause,
            include: [
                {model: db.Category, as: 'categoriesmodel', attributes: ['name']},
            ],
        })
        resolve({
            err: response? 0 : 1,
            msg: response ? 'OK' : 'Failed to get category',
            response
        });
    } catch (error) {
        reject(error);
    }
})

export const createSamplesService = ({ name, idCategory, state }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Sample.create({
            name,
            idCategory,
            state,
            include: [
                {model: db.Category, as: 'categoriesmodel', attributes: ['name']},
            ],
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Tạo mẫu sản phẩm thành công.' : 'Tạo mẫu sản phẩm không thành công',
            response: response || null
        });
    } catch (error) {
        reject(error)
    }
})

export const updateSamplesService = ({ id, name, idCategory, state }) => new Promise(async (resolve, reject) => {
    try {
        const sample = await db.Sample.findByPk(id);

        const response = await sample.update({
            name,
            idCategory,
            state,
            include: [
                {model: db.Category, as: 'categoriesmodel', attributes: ['name']},
            ],
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Cập nhật mẫu sản phẩm thành công.' : 'Cập nhật mẫu sản phẩm không thành công',
            response: response || null
        });
    } catch (error) {
        reject(error);
    }
})