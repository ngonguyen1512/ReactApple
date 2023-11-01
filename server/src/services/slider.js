import db from '../models';

//Get all categories
export const getAllSliderService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Slider.findAll({
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

export const createSliderService = ({ name, url, state }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Slider.create({
            name,
            url,
            state,
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Successful create.' : 'Create failed.',
            response: response || null
        });
    } catch (error) {
        reject(error)
    }
})

export const deleteSliderService = (id) => new Promise(async (resolve, reject) => {
    try {
        const whereClause = {};
        whereClause.id = id;
        const response = await db.Slider.findOne({
            where: whereClause,
        });
        await response.destroy();
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'Successful delete.' : 'Delete failed.',
            response
        });
    } catch (error) {
        reject(error);
    }
});

export const updateSliderService = ({ id, name, url, state }) => new Promise(async (resolve, reject) => {
    try {
        const slider = await db.Slider.findByPk(id);

        const response = await slider.update({
            name,
            url,
            state,
        });

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Successful update.' : 'Update failed.',
            response: response || null
        });
    } catch (error) {
        reject(error);
    }
})