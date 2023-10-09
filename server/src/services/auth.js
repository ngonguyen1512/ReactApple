import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
require('dotenv').config();

//password encryption function
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const registerService = ({name ,phone, password, email, idPermission, state}) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Account.findOrCreate({
            //check phone number 
            where: { phone },
            defaults: {
                phone,
                name,
                password: hashPassword(password),
                email,
                idPermission,
                state,
                // id : uuidv4(),
            }
        })

        const token = response[1] && jwt.sign({id: response[0].id, phone: response[0].phone}, process.env.SECRET_KEY, {expiresIn: '1d'});
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Đăng ký thành công!' : 'Số điện thoại đã được đăng ký rồi.',
            token: token || null
        })
    } catch (error) {
        reject(error);
    }
})

export const loginService = ({ phone, password }) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Account.findOne({
            //check phone number and status = 1
            // attributes: ['name'],
            where: {phone , state: '1'},
            raw: true,
        })
        const isCorrectPassword = response && bcrypt.compareSync(password, response.password);
        
        const token = isCorrectPassword && jwt.sign({id: response.id, phone: response.phone}, process.env.SECRET_KEY, {expiresIn: '1d'});
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Đăng nhập thành công!' : response ? 'Mật khẩu không chính xác.' : 'Số điện thoại không tồn tại hoặc tài khoản của bạn chưa được kích hoạt.',
            token: token || null,
        })
        
    } catch (error) {
        reject(error);
    }
})
