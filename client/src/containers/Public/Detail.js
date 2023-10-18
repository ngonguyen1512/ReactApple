import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { Button } from '../../components/index'
import { path } from '../../utils/constant'
import { CartContext } from '../../contexts/Cart'

const Detail = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { products } = useSelector(state => state.product)
    const pathurl = location.pathname;
    const parts = pathurl.split('/');
    const lastPart = parts[parts.length - 1];
    const id = parseInt(lastPart);

    useEffect(() => {
        dispatch(actions.getProducts())
    }, [dispatch])

    return (
        <div className='w-full flex flex-col justify-center'>
            {products?.length > 0 && products.map(product => {
                if (product.id === id) {
                    return (
                        <div className='grid grid-cols-2 mb-10'>
                            <div className='w-full flex justify-center   '>
                                <img src={product.image} alt={product.name} className='w-full' />
                            </div>
                            <div className='mt-10 pl-10  border-l border-gray-600'>
                                <p className=' font-bold text-4xl'>{product.name}</p>
                                <p className='my-5 text-sm'>Promotion at: {product.address}</p>
                                <p className='text-2xl font-semibold'>{product.price.toLocaleString().replace(',', '.')} VND</p>
                                <div className='mx-1 my-5 bg-gray-200 rounded-lg shadow-md'>
                                    <p className='p-3 border-b border-gray-500 font-semibold text-lg'>Promotion</p>
                                    <p className='py-3 px-5 whitespace-pre-wrap'>{(product.promotion).split('.').join('.\u00a0\u00a0')}</p>
                                </div>
                                <div className='grid grid-cols-2 gap-2 h-14'>
                                    <CartContext.Consumer>
                                        {({ addToCart }) =>
                                            <>
                                                <Button
                                                    text='BUY NOW'
                                                    bgColor='bg-green-800'
                                                    textColor='text-white'
                                                    className='py-5'
                                                    onClick={() => {
                                                        addToCart(product)
                                                        navigate('/'+path.CART)
                                                    }}
                                                />
                                                <Button
                                                    text='ADD TO CART'
                                                    bgColor='bg-secondary2'
                                                    textColor='text-white'
                                                    value={product.id}
                                                    className='py-5'
                                                    onClick={() => addToCart(product)}
                                                />
                                            </>
                                        }
                                    </CartContext.Consumer>
                                </div>
                                <p className='my-5  whitespace-pre-wrap'>{(product.information).split('.').join('.\u00a0\u00a0')}</p>
                            </div>
                        </div>
                    )
                }
                return null
            })}

        </div>
    )
}

export default Detail