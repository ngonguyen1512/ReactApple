import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { InputForm, Button, Item } from "../../components";
import * as actions from '../../store/actions'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';

const PersonalInfor = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { invoicesall } = useSelector(state => state.invoice)
    const { likes } = useSelector(state => state.like)
    const { currentData } = useSelector(state => state.user)
    const idcurrent = parseInt(currentData.id)
    const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
    const { msg, update } = useSelector(state => state.account)
    const [invalidFields, setInvalidFields] = useState([])
    const [showInvoiceDetails, setShowInvoiceDetails] = useState(true);

    const [payload, setPayload] = useState({
        id: idcurrent, name: '', email: '',
        phone: '', passwordold: '', passwordnew: '',
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
    const handleOrderClick = () => {
        setShowInvoiceDetails(true);
    };
    const handleLikeClick = () => {
        setShowInvoiceDetails(false);
    };

    useEffect(() => {
        msg && Swal.fire('Oops !', msg, 'error');
    }, [msg, update]);

    useEffect(() => {
        dispatch(actions.getInvoices())
        dispatch(actions.getLikes())
    }, [dispatch])

    return (
        <div className='personalInfo'>
            <div className='formaccout'>
                <span className='title'>PERSONAL INFORMATION</span>
                <div className='table-account-form'>
                    <table onClick={handleClickRow}>
                        <tr>
                            <th>ID</th>
                            <td>{currentData.id}</td>
                        </tr>
                        <tr>
                            <th>NAME</th>
                            <td>{currentData.name}</td>
                        </tr>
                        <tr>
                            <th>PHONE</th>
                            <td>{currentData.phone}</td>
                        </tr>
                        <tr>
                            <th>EMAIL</th>
                            <td>{currentData.email}</td>
                        </tr>
                    </table>
                    <div className='form'>
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
            <div className='invoice-like'>
                <div className='header-invoicelike'>
                    <span className='title' onClick={handleOrderClick}>ORDER</span>
                    <span className='title' onClick={handleLikeClick}>LIKE</span>
                </div>
                {showInvoiceDetails ? (
                    <div className='pi-table-invoicedetail'>
                        <div className='pi-invoice'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>STATE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoicesall?.length > 0 && invoicesall
                                        .filter(item => item?.invoice_detail.idAccount === idcurrent) // Filter out the unwanted items
                                        .reduce((acc, item) => {
                                            const invoiceDetail = item?.invoice_detail;
                                            if (!invoiceDetail) return acc;
                                            const createdAtDate = new Date(invoiceDetail?.createdAt).toLocaleDateString();
                                            const stateString = invoiceDetail?.state === 1 ? 'Done' : invoiceDetail?.state === 0 ? 'Not yet' : 'Cancel';
                                            const stateColor = invoiceDetail?.state === 1 ? 'text-green-800' : 'text-red-500';

                                            if (!acc.some(accItem => accItem?.invoiceDetailId === invoiceDetail?.id))
                                                acc.push({
                                                    invoiceDetailId: invoiceDetail?.id,
                                                    jsx: (
                                                        <tr className='cursor-pointer' onClick={() => setSelectedInvoiceId(invoiceDetail?.id)}>
                                                            <td className='text-center'>{invoiceDetail?.id}</td>
                                                            <td className='text-center'>{createdAtDate}</td>
                                                            <td className='text-center'>{(invoiceDetail?.total).toLocaleString()}</td>
                                                            <td className={`text-center ${stateColor}`}>{stateString}</td>
                                                        </tr>
                                                    )
                                                });
                                            return acc;
                                        }, [])
                                        .map(item => item.jsx)
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='pi-detail'>
                            <table className='w-full'>
                                <thead>
                                    <tr>
                                        <th className='w-[8%]'>IDSP</th>
                                        <th className='w-[34%]'>NAME</th>
                                        <th className='w-[8%]'>QUANTITY</th>
                                        <th className='w-[25%]'>PRICE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {selectedInvoiceId && invoicesall?.length > 0 && invoicesall.map(item => {
                                        if (item?.invoice_detail.idAccount === idcurrent && item.idInvoice === selectedInvoiceId)
                                            return (
                                                <tr key={item.id}>
                                                    <td className='text-center'>{item.idProduct}</td>
                                                    <td className='pl-1'>{item.name}</td>
                                                    <td className='text-center'>{item.quantity}</td>
                                                    <td className='text-center'>{(item.price).toLocaleString()}</td>
                                                </tr>
                                            )
                                        return null;
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className='pi-like'>
                        {likes?.length > 0 && likes.map(item => {
                            if (item.idAccount === idcurrent)
                                return (
                                    <Item
                                        key={item?.like_product?.id}
                                        name={item?.like_product?.name}
                                        discount={item?.like_product?.discount}
                                        price={item?.like_product?.price}
                                        image={item?.like_product?.image}
                                        idCategory={item?.like_product?.idCategory}
                                        nameCategory={item?.like_product?.categories?.name}
                                        id={item?.like_product?.id}
                                        idCurrent={idcurrent}
                                        item={item}
                                    />
                                )
                            return null
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}

export default PersonalInfor