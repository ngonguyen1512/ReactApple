import * as services from '../services';


export const getCountInvoices = async(req, res) => {
    try {
        const response = await services.getCountInvoiceService();
        return res.status(200).json(response);
        
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Invoice controller' + error,
        })
    }
}

export const createInvoices = async (req, res) => {
    const { idAccount, phone, address, total, state, idProduct, name, quantity, price } = req.body;
    try {
        // if ( !idAccount || !phone || !address || !total || !state || !idProduct || !name || !quantity || !price) return res.status(400).json({
        //     err: 1,
        //     msg: 'Vui lòng điền vào tất cả các trường!'
        // })
        const response = await services.createInvoices(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Invoice controller' + error,
        })
    }
}