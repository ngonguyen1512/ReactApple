import icons from '../../utils/icons'
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '../../components';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { path } from '../../utils/constant';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import { Menu } from '../../components'

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

    const goLogin = useCallback((flag) => {
        navigate('/' + path.LOGIN, { state: { flag } })
    }, [navigate])

    useEffect(() => {
        headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [page, code, sample])

    return (
        <div ref={headerRef} className='header'>
            <div className='content'>
                <Link to={'/'}>
                    <div className='logo'>
                        <BsApple /> APPLE
                    </div>
                </Link>
                {!isLoggedIn &&
                    <div className='login'>
                        <span className='info'>apple.com HELLO!</span>
                        <Button
                            text={'LOGIN'}
                            bgColor='bg-[#3482F6]'
                            textColor='text-white'
                            onClick={() => goLogin(false)}
                        />
                    </div>
                }
                {isLoggedIn &&
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
                                <span onClick={() => {
                                        setIsShowMenu(false)
                                        dispatch(actions.logout())
                                        navigate(path.HOME)
                                    }}
                                >Logout</span>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Header