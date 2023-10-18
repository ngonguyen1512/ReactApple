import React, { useEffect } from 'react'
import { Header, Navigation, Footer } from './index'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Slider  } from '../../components/index';

const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 100)
  }, [isLoggedIn, dispatch])

  return (
    <div className="w-full flex flex-col items-center min-h-full bg-[#3e3e3f]">
      <Header />
      <Navigation />
      <Slider />
      <div className='w-1200 flex flex-col items-center justify-start bg-[#3e3e3f'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Home