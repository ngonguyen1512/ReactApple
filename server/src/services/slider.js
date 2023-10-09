import db from '../models';

//Get all categories
export const getAllSliderService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Slider.findAll({
            attributes: ['id', 'name', 'url'], 
            where: {state: '1'},
            raw: true
        });
        resolve({
            err: response? 0 : 1,
            msg: response ? 'OK' : 'Failed to get slider',
            response
        });
    } catch (error) {
        reject(error);
    }
});