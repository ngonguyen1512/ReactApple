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
        <div ref={headerRef} className='w-full h-60 bg-[#101010] flex justify-center '>
            <div className='w-1200 h-60 flex items-center justify-between '>
                <Link to={'/'}>
                    <div className='flex gap-2.5 text-xl text-white font-bold font-sans tracking-wider hover:cursor-pointer items-center'>
                        <BsApple /> APPLE
                    </div>
                </Link>
                {!isLoggedIn &&
                    <div className='flex items-center gap-1'>
                        <span className='text-white mr-4'>apple.com HELLO! </span>
                        <Button
                            text={'LOGIN'}
                            bgColor='bg-[#2f3033]'
                            textColor='text-white'
                            onClick={() => goLogin(false)}
                        />
                    </div>
                }
                {isLoggedIn &&
                    <div className='flex items-center gap-1 relative'>
                        <span className='text-white mr-4'>Hello, <b>{currentData.name}</b> </span>
                        <Button
                            text={'Account'}
                            textColor='text-white'
                            bgColor='bg-[#2f3033]'
                            IcAfter={BsChevronDown}
                            onClick={() => setIsShowMenu(prev => !prev)}
                        />
                        {isShowMenu &&
                            <div className="absolute min-w-200 top-full bg-white shadow-md rounded-md py-3 px-5 right-0 flex z-50 flex-col">
                                <Menu permis={currentData.idPermission} />
                                <span
                                    className='cursor-pointer border-t-2 border-gray-200 pt-2 flex items-center'
                                    onClick={() => {
                                        setIsShowMenu(false)
                                        dispatch(actions.logout())
                                        navigate(path.HOME)
                                    }}
                                >LOGOUT</span>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Header