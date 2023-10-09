import React, { useEffect } from 'react'
import { Header, Navigation } from '../Public/index'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const HomeServer = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth)
  // useEffect(() => {
  //   const fetchCurrent = async () => {
  //     const response = await apiGetCurrent();
  //     console.log(response);
  //   }
  //   isLoggedIn && fetchCurrent()
  // }, [isLoggedIn])

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 100)
  }, [isLoggedIn, dispatch])

  return (
    <div className="w-full flex flex-col items-center min-h-full bg-secondary3">
      <Header />
      {isLoggedIn && <div className='w-full flex flex-col items-center min-h-full bg-secondary3'>
        <Navigation />
        <div className='w-1200 flex flex-col items-center justify-start bg-secondary3'>
          <Outlet />
        </div>
      </div>}

      {!isLoggedIn &&
        <div className='w-full h-full flex items-center justify-center my-[15%]'>
          <div className='bg-white w-[500px] p-8 shadow-lg rounded-lg border'>
            <h2 className='text-3xl tracking-widest font-extrabold mb-3 text-red-500'>NOTICE</h2>
            <p>Đây là webserver quản trị. Bạn không được quyền truy cập khi chưa đăng nhập và tài khoản 
              của bạn phải có đủ quyền để truy cập. Vui lòng đăng nhập tài khoản. Cảm ơn!!!
            </p>
          </div>
        </div>
      }
    </div>
  )
}

export default HomeServer