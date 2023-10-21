import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'
import icons from '../../utils/icons'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { useLocation } from 'react-router-dom'
import { path } from '../../utils/constant'
import { CartContext } from '../../contexts/Cart'

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
            {({ cartItems }) => (
              <NavLink to={path.CART} className='content'>
                <BsCart4 />
                <span className=''>({cartItems.length})</span>
              </NavLink>
            )}
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