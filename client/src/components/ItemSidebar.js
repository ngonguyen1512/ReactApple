import React, { memo, useEffect, useState } from 'react'
import icons from '../utils/icons'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../store/actions'
import { useLocation, useNavigate, createSearchParams } from 'react-router-dom'

const { AiOutlineCaretRight, BsChevronDown } = icons

const ItemSidebar = ({ title, content, isDouble, type, list, texts }) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const { samples } = useSelector(state => state.app)
  const [selectedDiv, setSelectedDiv] = useState(null)
  const [isShowSortPrice, setIsShowSortPrice] = useState(false)

  useEffect(() => {
    dispatch(actions.getSamples());
  }, [dispatch]);

  const handleFilterPosts = (id) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({ [type]: id }).toString()
    });
    if (selectedDiv === id) setSelectedDiv(null);
    else setSelectedDiv(id);
  };
  
  return (
    <div className='side-bar'>
      {!isDouble ? (
        <div className='center'>
          {content?.length > 0 && list?.length > 0 && content.map(item => {
            if (item.state === 1)
              return (
                <div className='tagname flex'>
                  {samples?.length > 0 && samples.map(items =>
                    items.idCategory === item.id && item.name === list && (
                      <div
                        onClick={() => handleFilterPosts(items.id)}
                        className={`mx-2 px-2 py-1 hover:text-blue-500 
                        ${selectedDiv === items.id ? 'bg-[#e7e7e7] font-semibold rounded-md' : ''}`}
                      >{items.name}</div>
                    )
                  )}
                </div>
              )
            return null
          })}
        </div>
      ) : (
        <div>
          <span className='sort' onClick={() => setIsShowSortPrice(prev => !prev)}>
            <p className='center gap-4'>{title} <BsChevronDown /> </p>
          </span>
          {isShowSortPrice &&
            <div className='flex gap-1' >
              {content?.length > 0 && content.map(item => {
                return (
                  <div onClick={() => handleFilterPosts(item.id)}
                    className={`flex px-2 py-1 gap-1 items-center cursor-pointer hover:text-blue-500 
                      ${selectedDiv === item.id ? 'bg-[#E0E0E0] font-semibold rounded-md' : ''}`}>
                    <AiOutlineCaretRight className="custom-icon" />
                    <p>{item.value}</p>
                  </div>
                )
              })}
            </div>
          }
        </div>
      )}
    </div>
  )
}

export default memo(ItemSidebar)