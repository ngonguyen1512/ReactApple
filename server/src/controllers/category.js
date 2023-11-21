import * as services from '../services';

export const getCategories = async (req, res) => {
    try {
        const response = await services.getAllCategoriesService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Category controller' + error,
        })
    }
}

export const getLimitCategories = async (req, res) => {
    const { page } = req.query
    try {
        const response = await services.getLimitCategoriesService(page);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Category controller' + error,
        })
    }
}

export const createCategories = async (req, res) => {
    const { name, image, state } = req.body;
    try {
        if (!name || !image || !state) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await services.createCategoriesService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Category controller' + error,
        })
    }
}

export const updateCategories = async (req, res) => {
    const { name, image, state } = req.body;
    try {
        if (!name || !image || !state) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await services.updateCategoriesService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Category controller' + error,
        })
    }
}