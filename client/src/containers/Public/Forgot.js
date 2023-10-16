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
    const [payload, setPayload] = useState({
        phone: '',
        email: '',
    });

    const handleSubmit = async () => {
        let finalPayload = payload;
        let invalids = validate(finalPayload);
        if (invalids === 0) {
            try {
                await dispatch(actions.forgot(payload));
                navigate('/' + path.LOGIN)
            } catch (error) {
                Swal.fire('Oops!', msg, 'error');
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
                    default:
                        break;
                }
            }
        })
        return invalids;
    }

    return (
        <div className='w-full flex items-center justify-center my-10'>
            <div className="bg-white w-[500px] p-[30px] pb-24 shadow-sm rounded-lg border ">
                <h3 className="font-bold text-3xl mb-12">FORGOT PASSWORD</h3>
                <div className="w-full flex-col gap-5">
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
                    <div className="mt-12">
                        <Button
                            text='GET NEW PASSWORD'
                            textColor='text-white'
                            bgColor='bg-secondary2'
                            fullWidth
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Forgot