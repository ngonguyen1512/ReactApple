import * as authService from '../services';

export const register = async (req, res) => {
    //Get data from body post here
    const { name, phone, password, email, idPermission, state} = req.body;
    try {
        if (!name || !phone || !password || !email || !idPermission || !state) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await authService.registerService(req.body);
        
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller: ' + error
        })
    }
}

export const login = async (req, res) => {
    //Get data from body post here
    const {phone, password} = req.body;
    try {
        if (!phone || !password) return res.status(400).json({
            err: 1,
            msg: 'Vui lòng điền vào tất cả các trường!'
        })
        const response = await authService.loginService(req.body);
        // console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth server controller: ' + error
        })
    }
}