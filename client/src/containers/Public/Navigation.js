import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'
import icons from '../../utils/icons'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { useLocation } from 'react-router-dom'
import { path } from '../../utils/constant'
import { CartContext } from '../../contexts/Cart'

const notActive = 'hover:bg-secondary1 hover:text-white hover:font-bold rounded-b-xl px-8 h-full flex items-center gap-1'
const { AiFillHome, BsCart4 } = icons

const Navigation = () => {
  const location = useLocation()
  const dispatch = useDispatch()
  const { categories } = useSelector(state => state.app)
  const { transfers } = useSelector(state => state.transfer)
  const { currentData } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(actions.getCategories());
    dispatch(actions.getTransfers());
  }, [dispatch]);

  const pathurl = location.pathname
  const parts = pathurl.split('/')[1]

  return (
    <div className='w-full h-50 flex justify-center border-b drop-shadow-xl bg-primary text-black '>
      {parts !== 'webserver' &&
        <div className='w-1200 h-50 flex items-center justify-between'>
          <NavLink to={`/`} className={notActive}><AiFillHome />HOME</NavLink>
          {categories?.length > 0 && categories.map(item => {
            if (item.state === 1) {
              return (
                <div className='h-full flex jusitify-center items-center'>
                  <NavLink key={item.id} to={`${formatVietnameseToString(item.name)}`} className={notActive}>
                    {item.name}
                  </NavLink>
                </div>
              )
            }
            return null
          })}
          <CartContext.Consumer>
            {({ cartItems }) => (
              <NavLink to={path.CART} className={notActive}>
                <BsCart4 />
                <span className='text-red-500'>({cartItems.length})</span>
              </NavLink>
            )}
          </CartContext.Consumer>
        </div>
      }
      {parts === 'webserver' &&
        <div className='w-1200 h-50 flex items-center justify-between'>
          {transfers?.length > 0 && transfers.map(item => {
            return (
              <div className='h-full flex jusitify-center items-center'>
                {item.idPermission === currentData.idPermission &&
                  <div className='h-full flex jusitify-center items-center'>
                    <NavLink key={item.id} to={`${formatVietnameseToString(item.name)}`} className={notActive}>
                      {item.name}
                    </NavLink>
                  </div>
                }
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}

export default Navigation