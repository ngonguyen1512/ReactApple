import React, { useState, useEffect } from 'react';
import { InputForm, Button } from "../../components";
import * as actions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { path } from '../../utils/constant';

const Login = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn, msg, update } = useSelector(state => state.auth)
    const [isRegister, setIsRegister] = useState(location.state?.flag)
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        idPermission: '3',
        state:'1'
    });

    useEffect(() => {
        setIsRegister(location.state?.flag)
    }, [location.state?.flag])

    const handleSubmit = async () => {
        let finalPayload = isRegister ? payload : {
            phone: payload.phone,
            password: payload.password
        }
        let invalids = validate(finalPayload);
        if (invalids === 0) isRegister ? dispatch(actions.register(payload)) : dispatch(actions.login(payload));
    }

    const validate = (payload) => {
        let invalids = 0;
        let fields = Object.entries(payload);

        fields.forEach(item => {
            if (item[1] === '') {
                setInvalidFields(prev => [...prev, {
                    name: item[0],
                    msg: 'Bạn không được bỏ trống trường này!'
                }])
                invalids++;
                return;
            } else if (item[1] !== '') {
                switch (item[0]) {
                    case 'password': {
                        if (item[1].length < 4) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                msg: 'Mật khẩu tối thiểu 4 kí tự!'
                            }])
                            invalids++;
                        }
                        break;
                    }
                    case 'phone': {
                        if (!+item[1]) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                msg: 'Số điện thoại không hợp lệ!'
                            }])
                            invalids++;
                        }
                        break;
                    }
                    case 'email': {
                        if (!/\S+@\S+\.\S+/.test(item[1])) {
                            setInvalidFields(prev => [...prev, {
                                name: item[0],
                                msg: 'Email không hợp lệ!'
                            }])
                            invalids++;
                        }
                        break;
                    }
                    default:
                        break;
                }
            }
        })
        return invalids;
    }

    useEffect(() => {
        isLoggedIn && navigate('/');
    }, [isLoggedIn, navigate]);

    useEffect(() => {
        msg && Swal.fire('Oops !', msg, 'error');
    }, [msg, update]);

    return (
        <div className='w-full flex items-center justify-center my-10'>
            <div className="bg-white w-[500px] p-[30px] pb-24 shadow-sm rounded-lg border ">
                <h3 className="font-bold text-3xl mb-12">{isRegister ? 'ĐĂNG KÝ' : 'ĐĂNG NHẬP'}</h3>
                <div className="w-full flex-col gap-5">
                    {isRegister &&
                        <InputForm
                            setInvalidFields={setInvalidFields}
                            invalidFields={invalidFields}
                            label={'HỌ TÊN'}
                            value={payload.name}
                            setValue={setPayload}
                            keyPayload={'name'}
                            type='text'
                        />
                    }
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields} 
                        label={'SỐ ĐIỆN THOẠI'}
                        value={payload.phone}
                        setValue={setPayload}
                        keyPayload={'phone'}
                        type='tel'
                    />
                    {isRegister &&
                        <InputForm
                            setInvalidFields={setInvalidFields}
                            invalidFields={invalidFields}
                            label={'EMAIL'}
                            value={payload.email}
                            setValue={setPayload}
                            keyPayload={'email'}
                            type='email'
                        />
                    }
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'MẬT KHẨU'}
                        value={payload.password}
                        setValue={setPayload}
                        keyPayload={'password'}
                        type='password'
                    />
                </div>
                <div className="mt-12">
                    <Button
                        text={isRegister ? 'ĐĂNG KÝ' : 'ĐĂNG NHẬP'}
                        textColor='text-white'
                        bgColor='bg-secondary2'
                        fullWidth
                        onClick={handleSubmit}
                    />
                </div>
                <div className="mt-5 flex items-center justify-between">
                    {
                        isRegister ? <small>Bạn đã có tài khoản? <span className='text-blue-500 hover:underline cursor-pointer'
                            onClick={() => {
                                setIsRegister(false)
                                setPayload({
                                    name: '',
                                    phone: '',
                                    email: '',
                                    password: '',
                                    idPermission: '4',
                                })
                            }}>Đăng nhập ngay</span></small>
                            : <>
                                <small className='text-blue-500 hover:text-[red] cursor-pointer'
                                onClick={() => {navigate('/'+path.FORGOT)}}>Quên mật khẩu</small>
                                <small className='text-blue-500 hover:text-[red] cursor-pointer'
                                    onClick={() => {
                                        setIsRegister(true)
                                        setPayload({
                                            name: '',
                                            phone: '',
                                            email: '',
                                            password: '',
                                            idPermission: '4',
                                        })
                                    }}>Đăng ký tài khoản</small>
                            </>
                    }
                </div>
            </div>
        </div>
    )
}

export default Login;