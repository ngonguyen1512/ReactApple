import React, { useEffect } from 'react'
import { Header, Navigation, Footer } from './index'
import { Outlet, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Slider, TextSlide } from '../../components/index';
import $ from 'jquery';

const Home = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth)
  const location = useLocation();
  const pathurl = location.pathname
  const parts = pathurl.split('/')[1]

  useEffect(() => {
    const handleScroll = () => {
      var scroll = $(window).scrollTop();
      if (scroll > 0) $('.navigation').addClass('fixed');
      else $('.navigation').removeClass('fixed');
    };
    $(window).scroll(handleScroll);
    return () => { $(window).off('scroll', handleScroll) };
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 100)
  }, [isLoggedIn, dispatch])

  return (
    <div className='background-home'>
      {/* <Header /> */}
      <Navigation />
      {parts === '' && <Slider />}
      <div className='main center'>
        <Outlet />
      </div>
      <TextSlide />
      <Footer />
    </div>
  )
}

export default Home