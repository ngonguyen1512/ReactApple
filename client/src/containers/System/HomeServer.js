import React, { useEffect } from 'react'
import { Header, Navigation } from '../Public/index'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import $ from 'jquery'

const HomeServer = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    const handleScroll = () => {
      var scroll = $(window).scrollTop();
      if (scroll > 0)
        $('.navigation').addClass('fixed');
      else
        $('.navigation').removeClass('fixed');
    };
    $(window).scroll(handleScroll);
    return () => {
      $(window).off('scroll', handleScroll);
    };
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      isLoggedIn && dispatch(actions.getCurrent())
    }, 100)
  }, [isLoggedIn, dispatch])

  return (
    <div className='background-home'>
      <Header />
      {isLoggedIn && <div className='background-home'>
        <Navigation />
        <div className='main'>
          <Outlet />
        </div>
      </div>}

      {!isLoggedIn &&
        <div className='notice'>
          <div className='form'>
            <h2>NOTICE</h2>
            <p>This is the management board's webpage. You can not access withou first logging in, and
              your account must be eligible for access. Please access your account. THANKS!!!</p>
          </div>
        </div>
      }
    </div>
  )
}

export default HomeServer