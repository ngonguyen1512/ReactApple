import * as services from '../services';

export const getProviders = async(req, res) => {
    const {page} = req.query
    try {
        const response = await services.getAllProvidersService(page);
        return res.status(200).json(response);
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Provider controller' + error,
        })
    }
}

export const createProviders = async (req, res) => {
    const { name, phone, email, address, state } = req.body;
    try {
        if (!name || !phone || !email || !address || !state) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await services.createProvidersService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Provider controller' + error,
        })
    }
}

export const updateProviders = async (req, res) => {
    const { id, state } = req.body;
    try {
        if (!state) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await services.updateProvidersService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Provider controller' + error,
        })
    }
}