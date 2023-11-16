import icons from '../../utils/icons'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../../components';
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import { Menu } from '../../components'

const { BiLogoApple, BsChevronDown } = icons

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.auth)
    const { currentData } = useSelector(state => state.user)
    const [isShowMenu, setIsShowMenu] = useState(false)

    const showMenuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (showMenuRef.current && !showMenuRef.current.contains(e.target))
                setIsShowMenu(false);
        };
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [showMenuRef]);

    const goLogin = useCallback((flag) => {
        navigate('/' + path.LOGIN, { state: { flag } })
    }, [navigate])

    const handleLogout = () => {
        setIsShowMenu(false);
        dispatch(actions.logout());
        navigate('/');
    }

    return (
        <div className='header center'>
            <div className='content'>
                <Link to={'/'}>
                    <div className='logo'><BiLogoApple /> APPLE</div>
                </Link>
                {!isLoggedIn ? (
                    <div className='login'>
                        <span className='info'>apple.com HELLO!</span>
                        <Button
                            text={'LOGIN'}
                            bgColor='bg-[#3482F6]'
                            textColor='text-white'
                            onClick={() => goLogin(false)}
                        />
                    </div>
                ) : (
                    <div className='account' ref={showMenuRef}>
                        <span className='info'>Hello, <b>{currentData.name}</b> </span>
                        <Button
                            text={'Account'}
                            textColor='text-white'
                            bgColor='bg-[#2f3033]'
                            IcAfter={BsChevronDown}
                            onClick={() => setIsShowMenu(prev => !prev)}
                        />
                        {isShowMenu &&
                            <div className='menu'>
                                <Menu permis={currentData.idPermission} />
                                <span onClick={() => handleLogout()}>Logout</span>
                            </div>
                        }
                    </div>
                )}
            </div>
        </div>
    )
}

export default Header