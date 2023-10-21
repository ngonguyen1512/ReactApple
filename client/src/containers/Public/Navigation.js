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

  useEffect(() => {
    dispatch(actions.getCategories());
    dispatch(actions.getTransfers());
  }, [dispatch]);

  const pathurl = location.pathname
  const parts = pathurl.split('/')[1]

  return (
    <div className='navigation'>
      {parts !== 'webserver' &&
        <div className='nav-web'>
          <NavLink to={`/`} className='content'><AiFillHome />HOME</NavLink>
          {categories?.length > 0 && categories.map(item => {
            if (item.state === 1) {
              return (
                <div className='nav-db center'>
                  <NavLink key={item.id} to={`${formatVietnameseToString(item.name)}`} className='content'>
                    {item.name}
                  </NavLink>
                </div>
              )
            }
            return null
          })}
          <CartContext.Consumer>
            {({ cartItems, updateQuantity, removeFromCart }) => {
              const total = cartItems.reduce((accumulator, product) =>
                accumulator + (product.price * product.quantity), 0);
              return (
                // <NavLink to={path.CART} className='content'>
                //   <BsCart4 />
                //   <span className=''>({cartItems.length})</span>
                // </NavLink>
                <div className='minicart'>
                  <span className='content' onClick={() => setIsShowMiniCart(prev => !prev)}>
                    <BsCart4 />
                    <span className=''>({cartItems.length})</span>
                  </span>
                  {isShowMiniCart &&
                    <div className='cart-menu'>
                      <table className='w-full'>
                        <tr className='border-b'>
                          <th>ID</th>
                          <th>NAME</th>
                          <th>QUANTITY</th>
                          <th>PRICE</th>
                          <th></th>
                        </tr>
                        {cartItems.map((product) => (
                          <tr className='border-b border-dashed' >
                            <td className='text-center'>{product.id}</td>
                            <td className='pl-4'>{product.name}</td>
                            <td className='text-center'>
                              <button className='px-2 bg-gray-500 rounded-sm mx-3'
                                onClick={() => updateQuantity(product, product.quantity - 1)}>-</button>
                              {product.quantity}
                              <button className='px-2 bg-gray-500 rounded-sm mx-3'
                                onClick={() => updateQuantity(product, product.quantity + 1)}>+</button>
                            </td>
                            <td className='text-center'>{product.price.toLocaleString()}</td>
                            <td className='text-red-500 text-xl'>
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
      }
      {parts === 'webserver' &&
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
      }
    </div>
  )
}

export default Navigation