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
    
    const goLogin = useCallback((flag) => {
        navigate('/'+path.LOGIN, { state: { flag } })
    }, [navigate])
    
    useEffect(() => {
        headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [searchParams.get('page'), searchParams.get('code'), searchParams.get('sample')])

    return (
        <div ref={headerRef} className='w-full h-60 bg-secondary1 flex justify-center '>
            <div className='w-1200 h-60 flex items-center justify-between '>
                <Link to={'/'}>
                    <div className='flex gap-2.5 text-xl text-white font-bold font-sans tracking-wider hover:cursor-pointer items-center'>
                        <BsApple /> APPLE
                    </div>
                </Link>
                {!isLoggedIn &&
                    <div className='flex items-center gap-1'>
                        <span className='text-white mr-4'>apple.com xin chào! </span>
                        <Button 
                            text={'Đăng nhập'} 
                            bgColor='bg-secondary2' 
                            textColor='text-white'  
                            onClick={() => goLogin(false)}  
                        />
                    </div>
                }
                {isLoggedIn &&
                    <div className='flex items-center gap-1 relative'>
                        <span className='text-white mr-4'>Xin chào, <b>{currentData.name}</b> </span>
                        <Button
                            text={'Tài khoản'}
                            textColor='text-white'
                            bgColor='bg-secondary2'
                            IcAfter={BsChevronDown}
                            onClick={() => setIsShowMenu(prev => !prev)}
                        />
                        {isShowMenu && 
                            <div className="absolute min-w-200 top-full bg-white shadow-md rounded-md py-3 px-5 right-0 flex z-50 flex-col">
                                <Menu permis={currentData.idPermission}  />
                                <span
                                    className='cursor-pointer border-t-2 border-gray-200 pt-2 flex items-center'
                                    onClick={() => {
                                        setIsShowMenu(false)
                                        dispatch(actions.logout())
                                        navigate(path.HOME)
                                    }}
                                >Log out</span>
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}

export default Header