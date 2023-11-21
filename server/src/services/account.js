import { where } from 'sequelize';
import db from '../models';
import bcrypt from 'bcryptjs';

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const getCountAccountService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Account.findAndCountAll({
            raw: true,
            nest: true,
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get category',
            response
        });
    } catch (error) { reject(error) }
})

export const getAllAccountsService = (page, permis) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        let response;
        if (permis === '2') {
            response = await db.Account.findAndCountAll({
                include: [
                    { model: db.Permission, as: 'permissionsAccount', attributes: ['id', 'name'] },
                ],
                where: { idPermission: [2, 3] },
                offset: offset * +process.env.LIMIT_ACCOUNT,
                limit: +process.env.LIMIT_ACCOUNT,
                order: [['updatedAt', 'DESC']],
                raw: true,
                nest: true,
            });
        } else if (permis === '1') {
            response = await db.Account.findAndCountAll({
                include: [
                    { model: db.Permission, as: 'permissionsAccount', attributes: ['id', 'name'] },
                ],
                offset: offset * +process.env.LIMIT_ACCOUNT,
                limit: +process.env.LIMIT_ACCOUNT,
                order: [['updatedAt', 'DESC']],
                raw: true,
                nest: true,
            });
        } else {
            resolve({
                err: 1,
                msg: 'Permission not found.',
                response,
            });
            return;
        }

        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get account',
            response
        });
    } catch (error) { reject(error) }
});

export const updateStateAccountsService = ({ id, state }) => new Promise(async (resolve, reject) => {
    try {
        const account = await db.Account.findByPk(id);
        const response = await account.update({
            state
        });
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Successful state account update.' : 'Account state update failed',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const getAccountOneService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Account.findAll({
            include: [
                { model: db.Permission, as: 'permissionsAccount', attributes: ['id', 'name'] },
            ],
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'OK.' : 'Failed to get account one',
            response: response || null
        });
    } catch (error) { reject(error) }
})

export const updateInfoAccountService = ({ id, name, phone, email, passwordold, passwordnew }) => new Promise(async (resolve, reject) => {
    try {
        const account = await db.Account.findByPk(id);
        const accounts = await db.Account.findOne({
            where: { id },
            raw: true,
        })
        const isCorrectPassword = bcrypt.compareSync(passwordold, accounts.password);
        if (isCorrectPassword) {
            const response = await account.update({
                name, phone, email, password: hashPassword(passwordnew)
            });
            resolve({
                err: response ? 0 : 2,
                msg: response ? 'Successful information account update.' : 'Update information account failed',
                response: response || null
            });
        } else
            resolve({
                err: accounts ? 0 : 2,
                msg: 'The old password is incorrect.'
            });
    } catch (error) { reject(error) }
})