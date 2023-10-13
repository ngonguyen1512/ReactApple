import db from '../models';

export const getCountAdmitService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Admit.findAndCountAll({
            // attributes: ['id', 'name','image'], 
            raw: true,
            nest: true,
            order: [['updatedAt', 'DESC']],
        });
        resolve({
            err: response? 0 : 1,
            msg: response ? 'OK' : 'Failed to get Admit',
            response
        });
    } catch (error) {
        reject(error)
    }
})

export const createAdmits = ({ idAccount, idProvider, total, state, admitDetails }) => new Promise(async (resolve, reject) => {
    try {
        const admit = await db.Admit.create({
            idAccount,
            idProvider,
            total,
            state,
        });
        if (admit) {
            const admitDetailPromises = [];
            for (let i = 0; i < admitDetails.length; i++) {
                const { idProduct, name, quantity, price } = admitDetails[i];
                const admitDetail = await db.AdmitDetail.create({
                    idAdmit: admit.id,
                    idProduct,
                    name,
                    quantity,
                    price,
                    include: [
                        { model: db.Admit, as: 'admit_detail' },
                        { model: db.Product, as: 'product_admitdetail' },
                    ],
                });

                admitDetailPromises.push(admitDetail);                
            }
            const createdadmitDetails = await Promise.all(admitDetailPromises);
            resolve({
                err: 0,
                msg: 'Tạo admit thành công.',
                admit,
                admitDetails: createdadmitDetails
            });
        } else {
            resolve({
                err: 2,
                msg: 'Tạo admit không thành công',
                admit: null,
                admitDetails: null
            });
        }
    } catch (error) {
        reject(error);
    }
});
