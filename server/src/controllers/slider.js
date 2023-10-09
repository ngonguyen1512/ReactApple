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