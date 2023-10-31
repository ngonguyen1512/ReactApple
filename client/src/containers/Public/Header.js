import icons from '../../utils/icons'
import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { Button } from '../../components';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { path } from '../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import { Menu } from '../../components'
import { CartContext } from '../../contexts/Cart';

const { BsApple, BsChevronDown } = icons

const Header = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams()
    const headerRef = useRef()
    const { isLoggedIn } = useSelector(state => state.auth)
    const { currentData } = useSelector(state => state.user)
    const [isShowMenu, setIsShowMenu] = useState(false)
    const page = searchParams.get('page');
    const code = searchParams.get('code');
    const sample = searchParams.get('sample');
    const cartContext = useContext(CartContext);
    const { removeAllFromCart } = cartContext;

    const goLogin = useCallback((flag) => {
        navigate('/' + path.LOGIN, { state: { flag } })
    }, [navigate])

    const handleLogout = () => {
        removeAllFromCart();
        setIsShowMenu(false);
        dispatch(actions.logout());
        navigate(path.HOME);
    }

    useEffect(() => {
        headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [page, code, sample])

    return (
        <div ref={headerRef} className='header center'>
            <div className='content'>
                <Link to={'/'}>
                    <div className='logo'><BsApple /> APPLE</div>
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
                    <div className='account'>
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