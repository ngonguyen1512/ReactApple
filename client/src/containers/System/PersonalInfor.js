import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import icons from '../../utils/icons'
import { InputForm, Button } from "../../components";
import * as actions from '../../store/actions'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';

const { BiCommentDetail } = icons

const PersonalInfor = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentData } = useSelector(state => state.user)
    const idcurrent = parseInt(currentData.id)
    const [isShowDetail, setIsShowDetail] = useState(false)
    const { msg, update } = useSelector(state => state.account)
    const [invalidFields, setInvalidFields] = useState([])

    const [payload, setPayload] = useState({
        id: idcurrent,
        name: '',
        email: '',
        phone: '',
        passwordold: '',
        passwordnew: '',
    });
    const handleSubmit = async () => {
        dispatch(actions.updateInfoAccount(payload))
        dispatch(actions.logout())
        navigate(path.LOGIN)
    }
    const handleClickRow = () => {
        setPayload({
            ...payload, name: currentData.name, phone: currentData.phone, email: currentData.email
        });
    };

    useEffect(() => {
        msg && Swal.fire('Oops !', msg, 'error');
    }, [msg, update]);

    return (
        <div className='w-1200 my-10 p-3 '>
            <div>
                <span className='font-bold text-2xl text-center'>THÔNG TIN CÁ NHÂN</span>
                <div className='w-full py-4 px-10 grid grid-cols-3 gap-3'>
                    <table onClick={handleClickRow}>
                        <tr>
                            <th>ID</th>
                            <td>{currentData.id}</td>
                        </tr>
                        <tr>
                            <th>Name</th>
                            <td>{currentData.name}</td>
                        </tr>
                        <tr>
                            <th>Phone</th>
                            <td>{currentData.phone}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{currentData.email}</td>
                        </tr>
                    </table>
                    <div className='col-span-2 grid grid-cols-2 gap-3'>
                        <InputForm
                            setInvalidFields={setInvalidFields}
                            invalidFields={invalidFields}
                            label={'NAME'}
                            value={payload.name}
                            setValue={setPayload}
                            keyPayload={'name'}
                            type='text'
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
                            label={'OLD PASSWORD'}
                            value={payload.passwordold}
                            setValue={setPayload}
                            keyPayload={'passwordold'}
                            type='password'
                        />

                        <InputForm
                            setInvalidFields={setInvalidFields}
                            invalidFields={invalidFields}
                            label={'NEW PASSWORD'}
                            value={payload.passwordnew}
                            setValue={setPayload}
                            keyPayload={'passwordnew'}
                            type='password'
                        />
                        <Button

                            text={'UPDATE'}
                            bgColor='bg-secondary2'
                            value={payload.id}
                            setValue={setPayload}
                            textColor='text-white'
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>

            <span className='font-semibold text-xl'>Đơn hàng của bạn</span>
            <div className='py-5 px-10 grid grid-cols-3'>
                <table className='w-full border-collapse border-2'>
                    <tr>
                        <th>Mã ĐH</th>
                        <th>Ngày</th>
                        <th>Tổng ĐH</th>
                        <th>Chi tiết</th>
                    </tr>
                    <tr>
                        <th>1</th>
                        <td className='text-center'>15/9/2023</td>
                        <td className='text-center'>24,990,000</td>
                        <td className='flex justify-center' onClick={() => setIsShowDetail(prev => !prev)}><BiCommentDetail /></td>
                    </tr>
                </table>

                <table className='w-full col-span-2 border-collapse border-2'>
                    <tr>
                        <th className='w-[8%]'>IDSP</th>
                        <th className='w-[34%]'>Name</th>
                        <th className='w-[8%]'>Quantity</th>
                        <th className='w-[25%]'>Price</th>
                        <th className='w-[25%]'>Total</th>
                    </tr>
                    {isShowDetail &&
                        <tr>
                            <td className='text-center'>4</td>
                            <td className='pl-1'>iPhone 13</td>
                            <td className='text-center'>1</td>
                            <td className='text-center'>23,990,000</td>
                            <td className='text-center text-red-500'>23,990,000</td>
                        </tr>
                    }
                    {!isShowDetail && 
                        <tr>
                            <td className='h-[28px]' rowSpan={5}></td>
                        </tr>
                    }
                </table>
            </div>
        </div>
    )
}

export default PersonalInfor