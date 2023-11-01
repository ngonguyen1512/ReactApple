import * as services from '../services';

export const getSlider = async(req, res) => {
    try {
        const response = await services.getAllSliderService();
        return res.status(200).json(response);
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Slider controller' + error,
        })
    }
}

export const createSliders = async (req, res) => {
    const { name, url, state } = req.body;
    try {
        if (!name || !url || !state) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await services.createSliderService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Slider controller' + error,
        })
    }
}

export const deleteSliders = async (req, res) => {
    const { id } = req.body
    try {
        const response = await services.deleteSliderService(id);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Slider controller' + error,
        })
    }
}

export const updateSliders = async (req, res) => {
    const { id, name, url, state } = req.body;
    try {
        if (!name || !url || !state) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await services.updateSliderService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Slider controller' + error,
        })
    }
}