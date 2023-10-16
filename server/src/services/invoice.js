import db from '../models';

export const getCountInvoiceService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Invoice.findAndCountAll({
            raw: true,
            nest: true,
            include: [{ model: db.Account, as: 'account_invoice' }],
            order: [['updatedAt', 'DESC']],
        });

        resolve({
            err: response ? 0 : 1,
            msg: response ? 'OK' : 'Failed to get Invoice',
            response
        });
    } catch (error) { reject(error) }
})

export const createInvoices = ({ idAccount, phone, address, total, state, invoiceDetails }) => new Promise(async (resolve, reject) => {
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
            const invoiceDetailPromises = [];
            for (let i = 0; i < invoiceDetails.length; i++) {
                const { idProduct, name, quantity, price } = invoiceDetails[i];
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

                invoiceDetailPromises.push(invoiceDetail);
            }
            const createdInvoiceDetails = await Promise.all(invoiceDetailPromises);
            resolve({
                err: 0,
                msg: 'Create a successful invoice.',
                invoice,
                invoiceDetails: createdInvoiceDetails
            });
        } else {
            resolve({
                err: 2,
                msg: 'Invoice creation failed.',
                invoice: null,
                invoiceDetails: null
            });
        }
    } catch (error) {
        reject(error);
    }
});

export const getInvoiceService = () => new Promise(async (resolve, reject) => {
    try {
        const invoices = await db.Invoice.findAll({
            order: [['updatedAt', 'DESC']],
        });

        if (invoices.length > 0) {
            const invoiceIds = invoices.map(invoice => invoice.id);
            const response = await db.InvoiceDetail.findAll({
                where: { idInvoice: invoiceIds },
                include: [
                    { model: db.Invoice, as: 'invoice_detail' },
                    { model: db.Product, as: 'product_invoicedetail' },
                ],
            });
            resolve({
                err: 0,
                msg: 'Get the invoice successfully.',
                response
            });
        } else {
            resolve({
                err: 2,
                msg: 'No invoice!',
                invoices: null,
                response: null
            });
        }
    } catch (error) {
        reject(error);
    }
});

export const updateInvoicesService = ({ id, idAccept, state }) => new Promise(async (resolve, reject) => {
    try {
        const invoice = await db.Invoice.findByPk(id);

        const response = await invoice.update({
            idAccept,
            state,
        });

        if (state === 1) {
            const invoiceDetails = await db.InvoiceDetail.findAll({ where: { idInvoice: id } });
            for (const invoiceDetail of invoiceDetails) {
                const product = await db.Product.findByPk(invoiceDetail.idProduct);
                if (product) {
                    const updatedQuantity = product.quantity - invoiceDetail.quantity;
                    await product.update({
                        quantity: updatedQuantity >= 0 ? updatedQuantity : 0,
                    });
                }
            }
        }

        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Cập nhật invoice thành công.' : 'Cập nhật invoice không thành công',
            response: response || null
        });
    } catch (error) {
        reject(error);
    }
});

export const getTopSellingProducts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.InvoiceDetail.findAll({
            attributes: ['idProduct', [db.sequelize.fn('SUM', db.sequelize.col('InvoiceDetail.quantity')), 'totalSold']],
            include: [{ model: db.Product, as: 'product_invoicedetail' },],
            group: ['idProduct'],
            order: [[db.sequelize.literal('totalSold'), 'DESC']],
            limit: 4,
        });

        if (response.length > 0) {
            resolve({
                err: 0,
                msg: 'OK.',
                response
            });
        } else {
            resolve({
                err: 2,
                msg: 'Không có sản phẩm nào có số lượng bán cao!',
                response: null
            });
        }
    } catch (error) {
        reject(error);
    }
});
