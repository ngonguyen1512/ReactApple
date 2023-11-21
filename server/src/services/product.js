import db from '../models';
const { Op } = require("sequelize");

export const getAllProductsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.findAll({
            attributes: [
                'id', 'idCategory', 'image', 'name', 'address', 'price', 'discount',
                'code', 'promotion', 'information', 'idProvider'
            ],
            raw: true,
            nest: true,
            include: [
                { model: db.Category, as: 'categories', attributes: ['id', 'name'] },
                { model: db.Prices, as: 'prices', attributes: ['value', 'id'] },
                { model: db.Sample, as: 'samples', attributes: ['id', 'idCategory', 'name'], where: { state: '1' } },
            ],

        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get product',
            response
        });
    } catch (error) { reject(error); }
});

export const getNewProductsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Product.findAll({
            raw: true,
            nest: true,
            offset: 0,
            order: [['createdAt', 'DESC']],
            limit: +process.env.LIMIT_NEW,
            include: [
                { model: db.Category, as: 'categories', attributes: ['name'] },
                { model: db.Provider, as: 'providers', attributes: ['name'] },
                { model: db.Prices, as: 'prices', attributes: ['value', 'id'] },
                { model: db.Sample, as: 'samples', attributes: ['id', 'idCategory', 'name'], where: { state: '1' } },
            ],
            attributes: [
                'id', 'idCategory', 'image', 'name', 'address', 'price', 'discount',
                'code', 'promotion', 'information', 'idProvider'
            ],
            where: { state: '1' },
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get product',
            response
        });
    } catch (error) { reject(error); }
})

export const getProductsLimitService = (page, category, query, { code, sample }) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const queries = { ...query }
        const whereClause = {};
        if (code) whereClause.code = code;
        if (sample) whereClause.idSample = sample;
        if (category) whereClause.idCategory = category;

        const response = await db.Product.findAndCountAll({
            where: queries,
            offset: offset * +process.env.LIMIT,
            limit: +process.env.LIMIT,
            raw: true,
            nest: true,
            include: [
                { model: db.Category, as: 'categories', attributes: ['id', 'name'] },
                { model: db.Prices, as: 'prices', attributes: ['value', 'id'] },
            ],
            where: whereClause,
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get product',
            response
        });
    } catch (error) { reject(error); }
});

export const createProductsService = ({ idCategory, idSample, image, name, address, quantity, price, discount,
    code, promotion, information, idProvider, state }) => new Promise(async (resolve, reject) => {
        try {
            const response = await db.Product.create({
                idCategory, idSample, image, name, address,
                quantity, price, discount, code, promotion,
                information, idProvider, state,
                include: [
                    { model: db.Category, as: 'categories', attributes: ['id', 'name'] },
                    { model: db.Prices, as: 'prices', attributes: ['value', 'id'] },
                ]
            })
            resolve({
                err: response ? 0 : 2,
                msg: response ? 'Tạo sản phẩm thành công.' : 'Tạo sản phẩm không thành công',
                response: response || null
            });
        } catch (error) { reject(error) }
    })

export const updateProductsService = ({ id, name, quantity, price, discount, idProvider, state }) => new Promise(async (resolve, reject) => {
    try {
        const product = await db.Product.findByPk(id);
        const response = await product.update({
            name, quantity, price, discount, idProvider, state
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Cập nhật sản phẩm thành công.' : 'Cập nhật sản phẩm không thành công',
            response: response || null
        });
    } catch (error) { reject(error) }
})   
