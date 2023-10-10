import db from '../models';
import { sequelize } from 'sequelize';

export const getCountInvoiceService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Invoice.findAndCountAll({
            raw: true,
            nest: true,
        });
        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get Invoice',
            response
        });
    } catch (error) { reject(error) }
})

export const createInvoices = ({ idAccount, phone, address, total, state, idProduct, name, quantity, price }) => new Promise(async (resolve, reject) => {
    try {
        const invoice = await db.Invoice.create({
            idAccount,
            phone,
            address,
            total,
            state,
            include: [{ model: db.Account, as: 'account_invoice' }],
        });

        if (invoice) {
            const invoiceDetail = await db.InvoiceDetail.create({
                idInvoice: invoice.id,
                idProduct,
                name,
                quantity,
                price,
                include: [
                    { model: db.Invoice, as: 'invoice_detail' },
                    { model: db.Product, as: 'product_invoicedetail' },
                ],
            });

            resolve({
                err: 0,
                msg: 'Tạo hóa đơn thành công.',
                invoice,
                invoiceDetail
            });
        } else {
            resolve({
                err: 2,
                msg: 'Tạo hóa đơn không thành công',
                invoice: null,
                invoiceDetail: null
            });
        }
    } catch (error) { reject(error); }
});
