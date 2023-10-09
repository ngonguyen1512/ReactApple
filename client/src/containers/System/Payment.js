import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { path } from '../../utils/constant'
import { CartContext } from '../../contexts/Cart';
import { InputForm } from '../../components';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const Payment = () => {
    const { currentData } = useSelector(state => state.user)
    const idcurrent = parseInt(currentData.id)
    const { msg, update } = useSelector(state => state.account)
    const [invalidFields, setInvalidFields] = useState([])

    const [payload, setPayload] = useState({
        id: idcurrent,
        name: '',
        phone: '',
        address: '',
    });

    useEffect(() => {
        msg && Swal.fire('Oops !', msg, 'error');
    }, [msg, update]);

    return (
        <div className='w-1200 my-10 p-3'>
            <p className='text-2xl font-bold tracking-wider ml-3'>THANH TOÁN</p>
            <div className='grid grid-cols-3 gap-2 my-5'>
                <div className='col-span-2'>
                    <CartContext.Consumer>
                        {({ cartItems }) => {
                            const total = cartItems.reduce((accumulator, product) =>
                                accumulator + (product.price * product.quantity), 0);
                            return (
                                <div className='w-full mt-5 '>
                                    <table className='w-full  border rounded-lg border-black'>
                                        <tr className='border-b '>
                                            <th>ID</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th className='w-[25%]'>Thành tiền</th>
                                        </tr>
                                        {cartItems.map((product, index) => (
                                            <tr className='border-b border-dashed' >
                                                <td className='text-center'>{product.id}</td>
                                                <td className='pl-4'>{product.name}</td>
                                                <td className='text-center'>{product.quantity}</td>
                                                <td className='text-center text-blue-500 w-[25%]'>{(product.price * product.quantity).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                        <tr className='border-t border-black'>
                                            <td className='font-semibold pl-10 text-lg' colspan={3}>TỔNG</td>
                                            <td className='text-center border-l border-black text-xl font-semibold text-red-500'>{total.toLocaleString()}</td>
                                        </tr>
                                    </table>
                                </div>
                            )
                        }}
                    </CartContext.Consumer>
                </div>
                <div>
                    <p className='text-lg font-semibold mt-5'>Thông tin</p>
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
                        label={'PHONE'}
                        value={payload.phone}
                        setValue={setPayload}
                        keyPayload={'phone'}
                        type='tel'
                    />
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'ADDRESS'}
                        value={payload.address}
                        setValue={setPayload}
                        keyPayload={'address'}
                        type='text'
                    />
                </div>
            </div>
            <div className='w-full flex mt-5 justify-center items-center gap-2'>
                <Link to={'/' + path.CART} className='outline-none rounded-md font-semibold hover:underline flex items-center justify-center gap-1 bg-green-800 text-white py-2 px-4'>Back</Link>
                <Link to={'/'} className='outline-none rounded-md font-semibold hover:underline flex items-center justify-center gap-1 bg-secondary2 text-white py-2 px-4'>Thanh toán</Link>
            </div>
        </div>
    )
}

export default Payment