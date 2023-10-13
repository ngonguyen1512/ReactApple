import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { InputForm, Button } from '../../components/index'
import icons from '../../utils/icons'

const { TiDelete } = icons

const PageAdmit = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { currentData } = useSelector(state => state.user)
    const idcurrent = parseInt(currentData.id)
    const { products } = useSelector(state => state.product)
    const { providers } = useSelector(state => state.provider)
    const [invalidFields, setInvalidFields] = useState([])
    const [tableData, setTableData] = useState([]);


    const [payload, setPayload] = useState({
        idAccout: '' || idcurrent,
        idProvider: '',
        total: '',
        state: 0,
        admitDetails: [],
    });

    const [payloadf, setPayloadf] = useState({
        idProduct: '',
        name: '',
        price: '',
        quantity: '',
        idProvider: '',
    });
    // Hàm xử lý tính toán total
    const calculateTotalRow = (row) => {
        return row.price * row.quantity;
    };

    const handleAdd = () => {
        const newRow = {
            id: payloadf.idProduct,
            name: payloadf.name,
            quantity: payloadf.quantity,
            price: payloadf.price,
            total: 0,
            idProvider: payloadf.idProvider
        };
        const updatedRow = {
            ...newRow,
            total: calculateTotalRow(newRow)
        };
        setTableData([...tableData, updatedRow]);
    };

    console.log(payloadf)
    // useEffect(() => {
    //     msg && Swal.fire('Oops !', msg, 'error');
    //   }, [msg, update]);

    useEffect(() => {
        dispatch(actions.getProviders())
        dispatch(actions.getProducts())
    })

    return (
        <div className='w-full p-2 my-10'>
            <span className='text-4xl font-bold tracking-widest justify-center items-center'>CREATE ADMIT</span>
            <div className='mt-8 grid grid-cols-2 gap-5'>
                <div className='w-full h-64 border rounded-md overflow-auto'>
                    <table className='w-full h-full'>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                        </tr>
                        {products?.length > 0 && products.map(item => {
                            const handleClickRow = () => {
                                setPayloadf({
                                    ...payloadf, idProduct: item.id, name: item.name, price: item.price
                                });
                            };
                            return (
                                <tr className='cursor-pointer hover:bg-gray-400' onClick={handleClickRow}>
                                    <td className='text-center'>{item.id}</td>
                                    <td className='pl-4'>{item.name}</td>
                                    <td className='text-center'>{(item.price).toLocaleString()}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
                <div className='grid grid-cols-2 gap-3 mt-2'>
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'ID PRODUCT'}
                        value={payloadf.idProduct}
                        setValue={setPayloadf}
                        keyPayload={'idProduct'}
                        type='number'
                        disable={true}
                    />
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'Name'}
                        value={payloadf.name}
                        setValue={setPayloadf}
                        keyPayload={'name'}
                        type='text'
                        disable={true}
                    />
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'QUANTITY'}
                        value={payloadf.quantity}
                        setValue={setPayloadf}
                        keyPayload={'quantity'}
                        type='number'
                    />
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'ID PROVIDER'}
                        value={payloadf.idProvider}
                        setValue={setPayloadf}
                        keyPayload={'idProvider'}
                        type='number'
                    />
                    <div className='col-span-2'>
                        <Button
                            text='ADD'
                            bgColor='bg-secondary2'
                            textColor='text-white'
                            fullWidth
                            onClick={handleAdd}
                        />
                    </div>
                </div>
            </div>
            <div className='w-full h-96 border rounded-md overflow-auto'>
                <table className='w-full h-full'>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>QUANTITY</th>
                        <th>PRICE</th>
                        <th>TOTAL</th>
                        <th>ID PROVIDER</th>
                        <th></th>
                    </tr>
                    {tableData.map((row, index) => (
                        <tr key={index}>
                            <th>{row.id}</th>
                            <td className='pl-4'>{row.name}</td>
                            <td className='text-center'>{row.quantity}</td>
                            <td className='text-center'>{(row.price).toLocaleString()}</td>
                            <td className='text-center'>{(row.total).toLocaleString()}</td>
                            <td className='text-center'>{row.idProvider}</td>
                            <td className='text-red-500 text-xl text-center'>
                                {/* <button onClick={() => handleDelete(index)}> */}
                                <TiDelete />
                                {/* </button> */}
                            </td>
                        </tr>
                    ))}
                </table>

            </div>
            <div></div>
            <div className=' mt-8'>
                <Button
                    text={'SAVE'}
                    bgColor='bg-secondary2'
                    textColor='text-white'
                // onClick={() => goLogin(false)} 
                />
            </div>
        </div>
    )
}

export default PageAdmit