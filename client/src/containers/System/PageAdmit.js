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
    const { products } = useSelector(state => state.product)
    const { providers } = useSelector(state => state.provider)
    const [invalidFields, setInvalidFields] = useState([])

    const [payload, setPayload] = useState({
        idProduct: '',
        name: '',
        idProvider: '',
    });

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
                <div className='w-full'>
                    <div className='w-full h-64 border rounded-md overflow-auto'>
                        <table className='w-full h-full'>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                            </tr>
                            {products?.length > 0 && products.map(item => {
                                const handleClickRow = () => {
                                    setPayload({
                                        ...payload, idProduct: item.id, name: item.name
                                    });
                                };
                                return (
                                    <tr className='cursor-pointer hover:bg-gray-400' onClick={handleClickRow}>
                                        <td className='text-center'>{item.id}</td>
                                        <td className='pl-4'>{item.name}</td>
                                        <td className='text-center'>{item.price}</td>
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
                            value={payload.idProduct}
                            setValue={setPayload}
                            keyPayload={'idProduct'}
                            type='number'
                            disable={true}
                        />
                        <InputForm
                            setInvalidFields={setInvalidFields}
                            invalidFields={invalidFields}
                            label={'Name'}
                            value={payload.name}
                            setValue={setPayload}
                            keyPayload={'name'}
                            type='text'
                            disable={true}
                        />
                        <InputForm
                            setInvalidFields={setInvalidFields}
                            invalidFields={invalidFields}
                            label={'QUANTITY'}
                            // value={payloadm.name}
                            // setValue={setPayloadm}
                            keyPayload={'quantity'}
                            type='number'
                        />
                        <div>
                            <label className='text-xs mt-4'>ID PROVIDER</label>
                            <select value={payload.idProvider}
                                onChange={(e) => setPayload({ ...payload, idProvider: e.target.value })}
                                className='outline-none bg-[#EEEEEE] p-2 rounded-md w-full ' >
                                <option value="">Select ID Permission</option>
                                {providers?.length > 0 && providers.map(item => (
                                    <option value={item.id}>{item.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className='col-span-2'>
                            <Button

                                text='ADD'
                                bgColor='bg-secondary2'
                                textColor='text-white'
                                fullWidth
                            // onClick={handleSubmitFunction}
                            />
                        </div>
                    </div>
                </div>
                <div>
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
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td className='text-red-500 text-xl'>
                                    <button><TiDelete /></button>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div className='grid grid-cols-2 mt-8'>
                        <div></div>
                        <Button 
                            text={'SAVE'} 
                            bgColor='bg-secondary2' 
                            textColor='text-white' 
                            // onClick={() => goLogin(false)} 
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageAdmit