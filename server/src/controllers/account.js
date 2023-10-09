import * as services from '../services';

export const getAccounts = async (req, res) => {
    const { page, permis } = req.query
    try {
        const response = await services.getAllAccountsService(page, permis);
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Account controller' + error,
        })
    }
}

export const getCountAccounts = async (req, res) => {
    try {
        const response = await services.getCountAccountService();
        return res.status(200).json(response);

    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Account controller' + error,
        })
    }
}

export const getAccountOne = async (req, res) => {
    try {
        const response = await services.getAccountOneService();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at Account controller' + error,
        })
    }
}

export const updateStateAccounts = async (req, res) => {
    const { id, state } = req.body;
    try {
        if (!state) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await services.updateStateAccountsService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at account controller' + error,
        })
    }
}
export const updateInfoAccounts = async (req, res) => {
    const { id, name, phone, email, passwordold, passwordnew } = req.body;
    try {
        if (!name || !phone || !email || !passwordold || !passwordnew) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await services.updateInfoAccountService(req.body);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            message: 'Failed at account controller' + error,
        })
    }
}