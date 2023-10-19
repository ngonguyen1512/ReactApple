import React, { useEffect } from 'react'
import { Header, Navigation, Footer } from './index'
import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Slider } from '../../components/index';

const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth)
  const location = useLocation();
  const pathurl = location.pathname
  const parts = pathurl.split('/')[1]

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 100)
  }, [isLoggedIn, dispatch])

  return (
    <div className='background-home'>
      <Header />
      <Navigation />
      {parts === '' && <Slider />}
      <div className='main'>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default Home