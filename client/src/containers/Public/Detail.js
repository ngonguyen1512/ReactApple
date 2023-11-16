import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { Button } from '../../components/index'
import { path } from '../../utils/constant'
import { CartContext } from '../../contexts/Cart'
import icons from '../../utils/icons'

const { AiOutlineHeart, AiFillHeart } = icons;

const Detail = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentData } = useSelector(state => state.user)
    const { likes } = useSelector(state => state.like)
    const { isLoggedIn } = useSelector(state => state.auth)
    const [isLiked, setIsLiked] = useState(false);
    const [likess, setLikess] = useState([]);
    const { productall } = useSelector(state => state.product)
    const pathurl = location.pathname;
    const parts = pathurl.split('/');
    const lastPart = parts[parts.length - 1];
    const id = parseInt(lastPart);

    const handleLike = (id) => {
        const updatedPayload = {
            idAccount: currentData.id,
            idProduct: id,
        };
        if (Array.isArray(likess)) {
            const existingLikeIndex = likess.findIndex(
                (item) => item.idProduct === id && item.idAccount === currentData.id
            );
            if (existingLikeIndex > -1) {
                setIsLiked(true);
                return;
            }
        }
        dispatch(actions.createLikes(updatedPayload));

        const updatedLikes = [...likess, updatedPayload];
        setLikess(updatedLikes);
        setIsLiked(true);
    };

    const handleUnLike = (id) => {
        const updatedPayload = {
            idAccount: currentData.id,
            idProduct: id,
        };
        dispatch(actions.deleteLikes(updatedPayload));

        const updatedLikes = likess.filter(
            (item) => item.idProduct !== id || item.idAccount !== currentData.id
        );
        setLikess(updatedLikes);

        const hasSomeLikes = updatedLikes.some(
            (item) => item.idProduct === id && item.idAccount === currentData.id
        );
        setIsLiked(hasSomeLikes || false);
    };

    useEffect(() => {
        if (Array.isArray(likes)) {
            const hasLiked = likes.some(
                (item) => item.idProduct === id && item.idAccount === currentData.id
            );
            setIsLiked(hasLiked);
        }
    }, [likes, id, currentData]);

    useEffect(() => {
        dispatch(actions.getLikes())
    }, [dispatch])


    useEffect(() => {
        dispatch(actions.getProducts())
    }, [dispatch])

    return (
        <div className='detail-product center'>
            {productall?.length > 0 && productall.map(product => {
                if (product.id === id)
                    return (
                        <div className='frame'>
                            <div className='image center'>
                                <img src={`/images/${product.image}`} alt={product.name} className='w-full' />
                            </div>
                            <div className='content'>
                                <div className='flex items-center justify-between'>
                                    <p className='name'>{product.name}</p>
                                    {isLoggedIn ? (
                                        <>
                                            {isLiked ? (
                                                <span className="icons text-3xl" onClick={() => handleUnLike(id)}><AiFillHeart style={{ color: 'red' }} /></span>
                                            ) : (
                                                <span className="icons text-3xl" onClick={() => handleLike(id)}><AiOutlineHeart /></span>
                                            )}
                                        </>
                                    ) : (
                                        <div className=''></div>
                                    )}
                                </div>
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
                                                    className='py-5'
                                                    onClick={() => {
                                                        addToCart(product)
                                                        navigate('/' + path.CART)
                                                    }}
                                                />
                                                <Button
                                                    text='ADD TO CART'
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