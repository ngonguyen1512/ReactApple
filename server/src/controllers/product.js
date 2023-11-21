import * as services from '../services';

export const getProducts = async(req, res) => {
    try {
        const response = await services.getAllProductsService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Product controller' + error,
        })
    }
}

export const getNewProducts = async(req, res) => {
    try {
        const response = await services.getNewProductsService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Product controller' + error,
        })
    }
}

export const getProductsLimit = async(req, res) => {
    const { page, code, sample, category, ...query } = req.query
    try {
        const response = await services.getProductsLimitService(page, category, query, {code, sample});
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Product limit controller' + error,
        })
    }
}

export const createProducts = async(req, res) => {
    const { idCategory, idSample, image, name, address, quantity, price, 
        discount, code, promotion, information, idProvider, state } = req.body;
    try {
        if (!idCategory || !idSample || !image || !name || !quantity || !price
            || !discount || !code || !idProvider || !state
            ) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await services.createProductsService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Product controller' + error
        })
    }
}

export const updateProducts = async (req, res) => {
    const { name, quantity, price, discount, idProvider, state} = req.body;
    try {
        if (!name || !quantity || !price || !discount || !idProvider || !state ) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await services.updateProductsService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at product controller' + error,
        })
    }
}
