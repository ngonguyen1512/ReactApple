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
        <div className='detail-product center'>
            {products?.length > 0 && products.map(product => {
                if (product.id === id) 
                    return (
                        <div className='frame'>
                            <div className='image center'>
                                <img src={`/images/${product.image}`} alt={product.name} className='w-full' />
                            </div>
                            <div className='content'>
                                <p className='name'>{product.name}</p>
                                <p className='address'>Promotion at: {product.address}</p>
                                {product.discount === 0 ? (
                                    <p className='price'>{product.price.toLocaleString()} VND</p>
                                ) : (
                                    <p className='price flex items-center'>
                                        <span>{((product.price * (100 - product.discount)) / 100).toLocaleString()} VND</span>
                                        <span className='line-through text-base pl-1 text-[#3482F6]'>{product.price.toLocaleString()}</span>
                                        <span className='text-base pl-1 text-[#ff0000]'>-{product.discount}%</span>
                                    </p>
                                )}
                                <div className='promotion'>
                                    <p className='title'>Promotion</p>
                                    <p className='text'>{(product.promotion).split('.').join('.\u00a0\u00a0')}</p>
                                </div>
                                <div className='btn'>
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
                                                        navigate('/' + path.CART)
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
                                <p className='information'>{(product.information).split('.').join('.\u00a0\u00a0')}</p>
                            </div>
                        </div>
                    )
                return null
            })}

        </div>
    )
}

export default Detail