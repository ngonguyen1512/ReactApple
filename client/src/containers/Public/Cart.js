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
    navigate(path.LOGIN, { state: { flag } })
  }, [navigate])

  return (
    <div className='w-1200 my-10 p-3'>
      <p className='text-2xl font-bold tracking-wider ml-3'>GIỎ HÀNG</p>
      <CartContext.Consumer>
        {({ cartItems, updateQuantity, removeFromCart }) => {
          const total = cartItems.reduce((accumulator, product) =>
            accumulator + (product.price * product.quantity), 0);
          return (
            <div className='w-full mt-5 '>
              <table className='w-full  border rounded-lg border-black'>
                <tr className='border-b '>
                  <th>ID</th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Đơn giá</th>
                  <th className='w-[25%]'>Thành tiền</th>
                  <th></th>
                </tr>
                {cartItems.map((product, index) => (
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
                      <button onClick={() => removeFromCart(product.id)}><TiDelete/></button>
                    </td>
                  </tr>
                ))}
                <tr className='border-t border-black'>
                  <td className='font-semibold pl-10 text-lg' colspan={4}>TỔNG TIỀN</td>
                  <td className='text-center border-l border-black text-xl font-semibold text-red-500'>{total.toLocaleString()}</td>
                  <td></td>
                </tr>
              </table>
            </div>
          )
        }}
      </CartContext.Consumer>
      {!isLoggedIn &&
        <div className="flex justify-center items-center mt-5">
          <span>Bạn vui lòng đăng nhập để thanh toán đơn hàng!</span>
          <Button text={'Đăng nhập'} bgColor='bg-secondary2' textColor='text-white' onClick={() => goLogin(false)} />
        </div>
      }
      {isLoggedIn &&
        <div className='w-full flex mt-5 justify-center items-center gap-2'>
          <Link to={path.HOME} className='outline-none rounded-md font-semibold hover:underline flex items-center justify-center gap-1 bg-green-800 text-white py-2 px-4'>Tiếp tục mua hàng</Link>
          <Link to={'/'+path.PAYMENT} className='outline-none rounded-md font-semibold hover:underline flex items-center justify-center gap-1 bg-secondary2 text-white py-2 px-4'>Tiến hành thanh toán</Link>
        </div>
      }
    </div>
  )
}

export default Cart