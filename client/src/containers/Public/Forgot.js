import React, { useState } from 'react';
import { InputForm, Button } from "../../components";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as actions from '../../store/actions';
import { path } from '../../utils/constant';

const Forgot = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { msg } = useSelector(state => state.auth)
    const [invalidFields, setInvalidFields] = useState([])
    const [payload, setPayload] = useState({phone: '', email: ''});

    const handleSubmit = async () => {
        let finalPayload = payload;
        let invalids = validate(finalPayload);
        if (invalids === 0) {
            try {
                await dispatch(actions.forgot(payload));
                navigate('/' + path.LOGIN)
            } catch (error) {
                Swal.fire('Success!', msg, 'success');
            }
        }
    };

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
                    default: break;
                }
            }
        })
        return invalids;
    }

    return (
        <div className='bg-frame center'>
            <div className='frame'>
                <h3 className='title'>FORGOT PASSWORD</h3>
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
                        label={'EMAIL'}
                        value={payload.email}
                        setValue={setPayload}
                        keyPayload={'email'}
                        type='email'
                    />
                </div>
                <div className="formbutton">
                    <Button
                        text='GET NEW PASSWORD'
                        fullWidth
                        onClick={handleSubmit}
                    />
                    <div className='mt-5 flex text-center justify-center cursor-pointer'>
                        <small><span className='text'
                            onClick={() => { navigate('/' + path.LOGIN) }}>BACK</span></small>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgot