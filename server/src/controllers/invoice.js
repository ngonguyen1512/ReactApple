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