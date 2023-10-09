import React, { useEffect } from 'react'
import { Header, Navigation, Footer } from './index'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const Home = () => {
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
      <Navigation />
      <div className='w-1200 flex flex-col items-center justify-start bg-secondary3'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Home