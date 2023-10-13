import * as services from '../services';

export const getCountAdmits = async(req, res) => {
    try {
        const response = await services.getCountAdmitService();
        return res.status(200).json(response);
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Admit controller' + error,
        })
    }
}

export const createAdmits = async (req, res) => {
    try {
        const response = await services.createAdmits(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Admit controller' + error,
        })
    }
}
