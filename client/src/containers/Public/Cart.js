import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { path } from '../../utils/constant';
import { Button } from '../../components'
import { Link } from 'react-router-dom'
import { CartContext } from '../../contexts/Cart';
import icons from '../../utils/icons'

const { TiDelete } = icons

const Cart = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const goLogin = useCallback((flag) => {
    navigate('/' + path.LOGIN, { state: { flag } })
  }, [navigate])

  return (
    <div className='cart'>
      <p className='title'>YOUR CART</p>
      <CartContext.Consumer>
        {({ cartItems, updateQuantity, removeFromCart }) => {
          const total = cartItems.reduce((accumulator, product) =>
            accumulator + (product.price * product.quantity), 0);
          return (
            <div className='table'>
              <table>
                <tr className='border-b'>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>QUANTITY</th>
                  <th>PRICE</th>
                  <th className='w-[25%]'>TOTAL</th>
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
                    <td className='text-center text-blue-500 w-[25%]'>{(product.price * product.quantity).toLocaleString()}</td>
                    <td className='text-red-500 text-xl'>
                      <button onClick={() => removeFromCart(product.id)}><TiDelete /></button>
                    </td>
                  </tr>
                ))}
                <tr className='border-t border-black'>
                  <td className='font-semibold pl-10 text-lg' colspan={4}>TOTAL ORDER</td>
                  <td className='text-center border-l border-black text-xl font-semibold text-red-500'>{total.toLocaleString()}</td>
                  <td></td>
                </tr>
              </table>
            </div>
          )
        }}
      </CartContext.Consumer>
      {!isLoggedIn &&
        <div className='footer'>
          <span className='mr-2'>Please login to continue paying for the order!</span>
          <Button text={'Login'} bgColor='bg-secondary2' textColor='text-white' onClick={() => goLogin(false)} />
        </div>
      }
      {isLoggedIn &&
        <div className='footer'>
          <Link to={path.HOME} className='btn bg-green-800'>COUNTINUE TO BUY</Link>
          <Link to={'/' + path.PAYMENT} className='btn bg-secondary2'>PAYMENT</Link>
        </div>
      }
    </div>
  )
}

export default Cart