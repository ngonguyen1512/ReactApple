import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputForm, Button } from "../../components";
import * as actions from '../../store/actions'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';


const PersonalInfor = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { invoicesall } = useSelector(state => state.invoice)
    const { currentData } = useSelector(state => state.user)
    const idcurrent = parseInt(currentData.id)
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
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

    useEffect(() => {
        dispatch(actions.getInvoices())
    })

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

            <div className='py-5 px-10 grid grid-cols-3 gap-4'>
                <div className='h-40 overflow-auto'>
                    <table className='w-full border-collapse border-2'>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>State</th>
                        </tr>
                        {invoicesall?.length > 0 && invoicesall.reduce((acc, item) => {
                            if (item?.invoice_detail.idAccount === idcurrent) {
                                const createdAtDate = new Date(item?.invoice_detail.createdAt).toLocaleDateString();
                                const stateString = item?.invoice_detail.state === 1 ? 'Done' : item?.invoice_detail.state === 0 ? 'Not yet' : 'Cancel';
                                const stateColor = item?.invoice_detail.state === 1 ? 'text-green-800' : 'text-red-500';
                                if (!acc.includes(item?.invoice_detail.id)) {
                                    acc.push(item?.invoice_detail.id);
                                    return [
                                        ...acc,
                                        <tr className='cursor-pointer' onClick={() => setSelectedInvoiceId(item?.invoice_detail.id)}>
                                            <th>{item?.invoice_detail.id}</th>
                                            <td className='text-center'>{createdAtDate}</td>
                                            <td className='text-center'>{(item?.invoice_detail.total).toLocaleString()}</td>
                                            <td className={`text-center ${stateColor}`}>{stateString}</td>
                                        </tr>
                                    ];
                                }
                            }
                            return acc;
                        }, [])}
                    </table>
                </div>
                <div className='h-40 overflow-auto col-span-2'>
                    <table className='w-full border-collapse border-2'>
                        <tr>
                            <th className='w-[8%]'>IDSP</th>
                            <th className='w-[34%]'>Name</th>
                            <th className='w-[8%]'>Quantity</th>
                            <th className='w-[25%]'>Price</th>
                        </tr>
                        {selectedInvoiceId && invoicesall?.length > 0 && invoicesall.map(item => {
                            if (item?.invoice_detail.idAccount === idcurrent && item.idInvoice === selectedInvoiceId) {
                                return (
                                    <tr key={item.id}>
                                        <td className='text-center'>{item.idProduct}</td>
                                        <td className='pl-1'>{item.name}</td>
                                        <td className='text-center'>{item.quantity}</td>
                                        <td className='text-center'>{(item.price).toLocaleString()}</td>
                                    </tr>
                                )
                            }
                            return null;
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
}

export default PersonalInfor