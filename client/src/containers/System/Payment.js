import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { path } from '../../utils/constant'
import { CartContext } from '../../contexts/Cart';
import { InputForm, Button } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as actions from '../../store/actions'

const Payment = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentData } = useSelector(state => state.user)
    const idcurrent = parseInt(currentData.id)
    const cartContext = useContext(CartContext);
    const { removeAllFromCart } = cartContext;
    const [invalidFields, setInvalidFields] = useState([])
    const { msg, update } = useSelector(state => state.account)

    const [payload, setPayload] = useState({
        idAccount: '' || idcurrent,
        phone: '' || currentData.phone,
        address: '', total: '', state: 0,
        invoiceDetails: [],
    });
    const address = payload.address;

    const calculateTotal = (cartItems) => {
        let total = 0;
        for (const product of cartItems)
            total += product.price * product.quantity;
        return total;
    };

    const handleCreateInvoices = async (cartItems) => {
        const total = calculateTotal(cartItems);
        const invoiceDetails = cartItems.map((product) => ({
            idProduct: product.id, name: product.name,
            quantity: product.quantity, price: product.price
        }));
        const payload = {
            idAccount: idcurrent, phone: currentData.phone,
            address: address, total: total, state: 0,
            invoiceDetails: invoiceDetails
        };
        try {
            await dispatch(actions.createInvoices(payload));
            Swal.fire('Success!', 'Your order has been submitted successfully.', 'error');
            removeAllFromCart();
            navigate('/');
        } catch (error) {
            Swal.fire('Oops!', 'Some error occurred while creating invoice', 'error');
        }
    };

    useEffect(() => {
        msg && Swal.fire('Oops !', msg, 'error');
    }, [msg, update]);

    return (
        <div className='payment'>
            <p className='text-2xl font-bold tracking-wider ml-3'>PAYMENT</p>
            <div className='main-payment'>
                <div className='cart-info'>
                    <CartContext.Consumer>
                        {({ cartItems }) => {
                            const total = cartItems.reduce((accumulator, product) =>
                                accumulator + (product.price * product.quantity), 0);
                            return (
                                <div className='w-full mt-5 '>
                                    <table className='w-full  border rounded-lg border-black'>
                                        <tr className='border-b '>
                                            <th>ID</th>
                                            <th>NAME</th>
                                            <th>QUANTITY</th>
                                            <th className='w-[25%]'>TOTAL</th>
                                        </tr>
                                        {cartItems.map((product) => (
                                            <tr className='border-b border-dashed' >
                                                <td className='text-center'>{product.id}</td>
                                                <td className='pl-4'>{product.name}</td>
                                                <td className='text-center'>{product.quantity}</td>
                                                <td className='text-center text-blue-500 w-[25%]'>{(product.price * product.quantity).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                        <tr className='border-t border-black'>
                                            <td className='font-semibold pl-10 text-lg' colspan={3}>TOTAL ORDER</td>
                                            <td className='text-center border-l border-black text-xl font-semibold text-red-500'>{total.toLocaleString()}</td>
                                        </tr>
                                    </table>
                                </div>
                            )
                        }}
                    </CartContext.Consumer>
                </div>
                <div className='payment-content'>
                    <p className='text-lg font-semibold mt-5 col-span-2' >INFORMATION</p>
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'NAME'}
                        value={currentData.name}
                        keyPayload={'name'}
                        type='text'
                        disabled={true}
                    />
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'PHONE'}
                        value={payload.phone}
                        setValue={setPayload}
                        keyPayload={'phone'}
                        type='tel'
                        disabled={true}
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
            <div className='payment-btn center gap-2'>
                <Button
                    text={'BACK'}
                    onClick={() => navigate('/' + path.CART)}
                />
                <CartContext.Consumer>
                    {({ cartItems }) => (
                        <Button
                            text={'PAYMENT'}
                            onClick={() => handleCreateInvoices(cartItems)}
                        />
                    )}
                </CartContext.Consumer>
            </div>
        </div>
    )
}

export default Payment