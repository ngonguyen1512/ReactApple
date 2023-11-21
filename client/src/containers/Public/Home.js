import React, { useEffect, useRef } from 'react'
import { Header, Navigation, Footer } from './index'
import { Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { Slider, TextSlide } from '../../components/index';
import $ from 'jquery';

const Home = () => {
  const headerRef = useRef()
  const location = useLocation()
  const dispatch = useDispatch()
  const pathurl = location.pathname
  const parts = pathurl.split('/')[1]
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page')
  const code = searchParams.get('code')
  const sample = searchParams.get('sample')
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [page, code, sample])

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
    <div ref={headerRef} className='background-home'>
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