import db from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
require('dotenv').config();

//password encryption function
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const registerService = ({ name, phone, password, email, idPermission, state }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Account.findOrCreate({
            where: { phone },
            defaults: {
                phone,
                name,
                password: hashPassword(password),
                email,
                idPermission,
                state,
            }
        })
        const token = response[1] && jwt.sign({ id: response[0].id, phone: response[0].phone }, process.env.SECRET_KEY, { expiresIn: '1d' });
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Đăng ký thành công!' : 'Số điện thoại đã được đăng ký rồi.',
            token: token || null
        })
    } catch (error) {
        reject(error);
    }
})

export const loginService = ({ phone, password }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Account.findOne({
            where: { phone, state: '1' },
            raw: true,
        })
        const isCorrectPassword = response && bcrypt.compareSync(password, response.password);

        const token = isCorrectPassword && jwt.sign({ id: response.id, phone: response.phone }, process.env.SECRET_KEY, { expiresIn: '1d' });
        resolve({
            err: token ? 0 : 2,
            msg: token ? 'Đăng nhập thành công!' : response ? 'Mật khẩu không chính xác.' : 'Số điện thoại không tồn tại hoặc tài khoản của bạn chưa được kích hoạt.',
            token: token || null,
        })

    } catch (error) {
        reject(error);
    }
})

const sendEmail = (email, subject, message) => {
    // Tạo một transporter để gửi email
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ngonguyenkey1512@gmail.com', // Email của bạn
            pass: 'kfxd ijlv kvos jocr' // Mật khẩu email của bạn
        }
    });

    // Cấu hình các thông tin cần gửi
    const mailOptions = {
        from: 'ngonguyenkey1512@gmail.com', // Email của bạn
        to: email, // Địa chỉ email nhận
        subject: subject, // Tiêu đề email
        text: message // Nội dung email (dạng text)
    };

    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const generateRandomPassword = (length) => {
    let password = '';

    for (let i = 0; i < length; i++) {
        const randomNumber = Math.floor(Math.random() * 10);
        password += randomNumber;
    }

    return password;
};

export const forgotPassword = ({ phone, email }) => new Promise(async (resolve, reject) => {
    try {
        const account = await db.Account.findOne({
            where: { phone },
            raw: true,
        });

        if (account) {
            const newPassword = generateRandomPassword(8);
            // Gửi email chứa mật khẩu mới tới địa chỉ email
            sendEmail(email, 'Lấy lại mật khẩu', `Mật khẩu mới của bạn là: ${newPassword}`);

            const updatedAccount = await db.Account.update(
                { password: hashPassword(newPassword)},
                { where: { id: account.id } }
            );
            if (updatedAccount) {
                resolve({
                    err: 0,
                    msg: 'Đã gửi mật khẩu mới tới địa chỉ email đăng ký của bạn.',
                });
            } else {
                reject('Không thể cập nhật mật khẩu mới.');
            }
        } else {
            resolve({
                err: 1,
                msg: 'Số điện thoại không tồn tại trong cơ sở dữ liệu.',
            });
        }

    } catch (error) {
        reject(error);
    }
});