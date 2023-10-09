import * as services from '../services';

export const getSamples = async(req, res) => {
    try {
        const response = await services.getAllSamplesService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Category controller' + error,
        })
    }
}

export const getLimitSamples = async(req, res) => {
    const {page} = req.query
    try {
        const response = await services.getLimitSamplesService(page);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Sample controller' + error,
        })
    }
}

export const getTypeSamples = async(req, res) => {
    const {query} = req.query;
    try {
        const response = await services.getTypeSamplesService(query);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Sample controller' + error,
        })
    }
}

export const getCategorySamples = async(req, res) => {
    const {idCategory} = req.body;
    try {
        const response = await services.getCategorySamplesService(idCategory);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Sample controller' + error,
        })
    }
}

export const createSamples = async (req, res) => {
    const { name, idCategory, state } = req.body;
    try {
        if (!name || !idCategory || !state) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await services.createSamplesService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Sample controller' + error,
        })
    }
}

export const updateSamples = async (req, res) => {
    const { id, name, idCategory, state } = req.body;
    try {
        if (!name || !idCategory || !state) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await services.updateSamplesService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Sample controller' + error,
        })
    }
}