import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'
import icons from '../../utils/icons'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { useLocation, createSearchParams } from 'react-router-dom'
import { path } from '../../utils/constant'
import { CartContext } from '../../contexts/Cart'
import { Button, Menu } from '../../components'

const { TiDelete, BsApple, BsChevronDown } = icons
const styletd = 'text-base px-4'

const Navigation = () => {
  const headerRef = useRef()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const showMenuRef = useRef(null)
  const pathurl = location.pathname
  const parts = pathurl.split('/')[1]
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page');
  const code = searchParams.get('code');
  const sample = searchParams.get('sample');
  const cartContext = useContext(CartContext);
  const { removeAllFromCart } = cartContext;
  const { categories } = useSelector(state => state.app)
  const { isLoggedIn } = useSelector(state => state.auth)
  const { currentData } = useSelector(state => state.user)
  const { transfers } = useSelector(state => state.transfer)
  const { productall } = useSelector(state => state.product)
  const [searchValue, setSearchValue] = useState("")
  const [isShowMenu, setIsShowMenu] = useState(false)
  const [selectedDiv, setSelectedDiv] = useState(null)
  const [shouldReload, setShouldReload] = useState(false)
  const [isShowSearch, setIsShowSearch] = useState(false)
  const [isShowMiniCart, setIsShowMiniCart] = useState(false)

  const handleFilterPosts = (id) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({ id }).toString()
    });
    if (selectedDiv === id) setSelectedDiv(null);
    else setSelectedDiv(id);
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setShouldReload(event.target.value !== "");
  };

  let filteredProducts = [];
  if (productall && Array.isArray(productall)) {
    filteredProducts = productall.filter((item) =>
      item.name.includes(searchValue)
    );
  }

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
    removeAllFromCart();
    setIsShowMenu(false);
    dispatch(actions.logout());
    navigate(path.HOME);
  }

  useEffect(() => {
    headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [page, code, sample])

  useEffect(() => {
    dispatch(actions.getProducts())
    dispatch(actions.getCategories());
    dispatch(actions.getTransfers());
  }, [dispatch]);

  const renderTableRow = (item) => {
    return (
      <tr>
        <td className='w-[15%]'>
          <img src={`/images/${item.image}`} alt={item.name} className='w-[100%] object-cover' />
        </td>
        {item.discount === 0 ? (
          <td className={styletd}>{item.name}<br />{(item.price).toLocaleString()}</td>
        ) : (
          <td className={styletd}>{item.name}<br />{((item.price * (100 - item.discount)) / 100).toLocaleString()}đ
            <span className='ml-2 text-[#a0a0a0] line-through'>{(item.price).toLocaleString()}đ</span></td>
        )}
      </tr>
    );
  };

  return (
    <div ref={headerRef} className='navigation'>
      {parts !== 'webserver' ? (
        <div ref={headerRef} className='nav-web'>
          <div className='logo-cate'>
            <NavLink to={'/'} className='logo text-2xl'>
              <BsApple /> APPLE
            </NavLink>
            {categories?.length > 0 && categories.map(item => {
              if (item.state === 1)
                return (
                  <div className='nav-db center'>
                    <NavLink key={item.id} to={`${formatVietnameseToString(item.name)}`} className={`content ${selectedDiv === item.id ? 'bg-[#e7e7e7] font-semibold' : ''}`} onClick={() => handleFilterPosts(item.id)}>
                      {item.name}
                    </NavLink>
                  </div>
                )
              return null
            })}
          </div>
          <div className='search-cart-log'>
            <div className='search'>
              <span className='' onClick={() => setIsShowSearch(prev => !prev)}>
                SEARCH
              </span>
              {isShowSearch &&
                <div>
                  <div className='cover'></div>
                  <div className='cart-menu'>
                    <div className='close' onClick={() => setIsShowSearch(false)}><TiDelete /></div>
                    <span className='cart-title'>SEARCH</span>
                    <input
                      className='outline-none bg-[#EEEEEE] p-2 rounded-md w-full text-[#000]'
                      type="text"
                      placeholder='Search by name'
                      value={searchValue}
                      onChange={handleSearch}
                    />
                    <div className='h-96 mt-[4%] overflow-auto'>
                      <table>
                        {shouldReload && filteredProducts.length > 0 && filteredProducts.map((item) => renderTableRow(item))}
                      </table>
                    </div>
                  </div>
                </div>
              }
            </div>
            <div className='minicart ml-3' >
              <CartContext.Consumer>
                {({ cartItems, updateQuantity, removeFromCart }) => {
                  const total = cartItems.reduce((accumulator, product) =>
                    accumulator + (product.price * product.quantity), 0);
                  return (
                    <div className='minicart'>
                      <span className='' onClick={() => setIsShowMiniCart(prev => !prev)}>
                        CART
                        <span className=''>({cartItems.length})</span>
                      </span>
                      {isShowMiniCart &&
                        <div>
                          <div className='cover'></div>
                          <div className='cart-menu'>
                            <div className='close' onClick={() => setIsShowMiniCart(false)}><TiDelete /></div>
                            <span className='cart-title'>CART</span>
                            <table className='w-full'>
                              <tr className='border-b'>
                                <th className='w-[40%]'>NAME</th>
                                <th className='w-[25%]'>QUANTITY</th>
                                <th className='w-[30%]'>PRICE</th>
                                <th className='w-[5%]'></th>
                              </tr>
                              {cartItems.map((product) => (
                                <tr className='border-b border-dashed' >
                                  <td className='w-[40%]'>{product.name}</td>
                                  <td className='text-center w-[25%]'>
                                    <button className='px-1.5 bg-gray-500 rounded-sm mx-1.5'
                                      onClick={() => updateQuantity(product, product.quantity - 1)}>-</button>
                                    {product.quantity}
                                    <button className='px-1.5 bg-gray-500 rounded-sm mx-1.5'
                                      onClick={() => updateQuantity(product, product.quantity + 1)}>+</button>
                                  </td>
                                  <td className='text-center w-[30%]'>{(product.price * product.quantity).toLocaleString()}</td>
                                  <td className='text-red-500 text-xl w-[5%]'>
                                    <button onClick={() => removeFromCart(product.id)}><TiDelete /></button>
                                  </td>
                                </tr>
                              ))}
                              <tr className='border-t border-black'>
                                <td className='font-semibold pl-10 text-lg' colSpan={2}>TOTAL</td>
                                <td className='text-center text-xl font-semibold' colSpan={2}>{total.toLocaleString()}</td>
                                <td></td>
                              </tr>
                            </table>
                            <p className='center view-cart'
                              onClick={() => {
                                navigate('/' + path.CART);
                                setIsShowMiniCart(false)
                              }}>Go to cart</p>
                          </div>
                        </div>
                      }
                    </div>
                  )
                }}
              </CartContext.Consumer>
            </div>
            <div className='log'>
              {!isLoggedIn ? (
                <div className='login'>
                  <Button text={'LOGIN'}
                    onClick={() => goLogin(false)}
                  />
                </div>
              ) : (
                <div className='account' ref={showMenuRef}>
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
        </div>
      ) : (
        <div className='nav-web'>
          {transfers?.length > 0 && transfers.map(item => {
            return (
              <>
                {item.idPermission === currentData.idPermission &&
                  <div className='nav-db center'>
                    <NavLink key={item.id} to={`${formatVietnameseToString(item.name)}`} className='content'>
                      {item.name}
                    </NavLink>
                  </div>
                }
              </>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Navigation