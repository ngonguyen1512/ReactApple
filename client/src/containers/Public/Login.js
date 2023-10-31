import React, { useState, useEffect } from 'react';
import { InputForm, Button } from "../../components";
import * as actions from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { path } from '../../utils/constant';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn, msg, update } = useSelector(state => state.auth)
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({
        phone: '', password: '',
    });

    const handleSubmit = async () => {
        let finalPayload = payload
        let invalids = validate(finalPayload);
        if (invalids === 0) dispatch(actions.login(payload));
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
        <div className='bg-frame center'>
            <div className='frame'>
                <h3 className='title'>LOGIN</h3>
                <div className='forminput'>
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'PHONE'}
                        value={payload.phone}
                        setValue={setPayload}
                        keyPayload={'phone'}
                        type='tel'
                    />
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'PASSWORD'}
                        value={payload.password}
                        setValue={setPayload}
                        keyPayload={'password'}
                        type='password'
                    />
                </div>
                <div className='formbutton'>
                    <Button
                        text='LOGIN'
                        textColor='text-white'
                        bgColor='bg-secondary2'
                        fullWidth
                        onClick={handleSubmit}
                    />
                </div>
                <div className='transit'>
                    <small className='text'
                        onClick={() => { navigate('/' + path.FORGOT) }}>Forgot password</small>
                    <small className='text'
                        onClick={() => { navigate('/' + path.REGISTER) }}>Register an account</small>
                </div>
            </div>
        </div>
    )
}

export default Login;