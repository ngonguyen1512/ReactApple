import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'
import icons from '../../utils/icons'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { useLocation } from 'react-router-dom'
import { path } from '../../utils/constant'
import { CartContext } from '../../contexts/Cart'

const { AiFillHome, BsCart4, TiDelete } = icons

const Navigation = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.app)
  const { transfers } = useSelector(state => state.transfer)
  const { currentData } = useSelector(state => state.user)
  const [isShowMiniCart, setIsShowMiniCart] = useState(false)
  const pathurl = location.pathname
  const parts = pathurl.split('/')[1]

  useEffect(() => {
    dispatch(actions.getCategories());
    dispatch(actions.getTransfers());
  }, [dispatch]);

  return (
    <div className='navigation'>
      {parts !== 'webserver' ? (
        <div className='nav-web'>
          <NavLink to={`/`} className='content text-2xl'><AiFillHome /></NavLink>
          {categories?.length > 0 && categories.map(item => {
            if (item.state === 1)
              return (
                <div className='nav-db center'>
                  <NavLink key={item.id} to={`${formatVietnameseToString(item.name)}`} className='content'>
                    {item.name}
                  </NavLink>
                </div>
              )
            return null
          })}
          <CartContext.Consumer>
            {({ cartItems, updateQuantity, removeFromCart }) => {
              const total = cartItems.reduce((accumulator, product) =>
                accumulator + (product.price * product.quantity), 0);
              return (
                <div className='minicart'>
                  <span className='content' onClick={() => setIsShowMiniCart(prev => !prev)}>
                    <BsCart4 />
                    <span className=''>({cartItems.length})</span>
                  </span>
                  {isShowMiniCart &&
                    <div className='cart-menu'>
                      <table className='w-full'>
                        <tr className='border-b'>
                          <th className='w-[40%]'>NAME</th>
                          <th className='w-[25%]'>QUANTITY</th>
                          <th className='w-[30%]'>PRICE</th>
                          <th className='w-[5%]'></th>
                        </tr>
                        {cartItems.map((product) => (
                          <tr className='border-b border-dashed' >
                            <td className='w-[40%]'>{product.name}</td>
                            <td className='text-center w-[25%]'>
                              <button className='px-1.5 bg-gray-500 rounded-sm mx-1.5'
                                onClick={() => updateQuantity(product, product.quantity - 1)}>-</button>
                              {product.quantity}
                              <button className='px-1.5 bg-gray-500 rounded-sm mx-1.5'
                                onClick={() => updateQuantity(product, product.quantity + 1)}>+</button>
                            </td>
                            <td className='text-center w-[30%]'>{product.price.toLocaleString()}</td>
                            <td className='text-red-500 text-xl w-[5%]'>
                              <button onClick={() => removeFromCart(product.id)}><TiDelete /></button>
                            </td>
                          </tr>
                        ))}
                      </table>
                      <p className='center' onClick={() => { navigate('/' + path.CART) }}>Go to cart</p>
                    </div>
                  }
                </div>
              )
            }}
          </CartContext.Consumer>
        </div>
      ) : (
        <div className='nav-web'>
          {transfers?.length > 0 && transfers.map(item => {
            return (
              <>
                {item.idPermission === currentData.idPermission &&
                  <div className='nav-db center'>
                    <NavLink key={item.id} to={`${formatVietnameseToString(item.name)}`} className='content'>
                      {item.name}
                    </NavLink>
                  </div>
                }
              </>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Navigation