import React, { memo, useEffect, useState } from 'react'
import icons from '../utils/icons'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../store/actions'
import { formatVietnameseToString } from '../utils/common/formatVietnameseToString'
import { Link, useLocation, useNavigate, createSearchParams } from 'react-router-dom'

const { AiOutlineCaretRight } = icons

const ItemSidebar = ({ title, content, isDouble, type, list, texts }) => {

  const dispatch = useDispatch();
  const { samples, categories, typesamples } = useSelector(state => state.app)

  useEffect(() => {
    dispatch(actions.getSamples());
    dispatch(actions.getTypeSamples());
  }, [dispatch]);

  const location = useLocation();
  const navigate = useNavigate();
  const formatContent = () => {
    const oddEl = content?.filter((item, index) => index % 2 !== 0);
    const evenEl = content?.filter((item, index) => index % 2 === 0);
    const formatContent = oddEl?.map((item, index) => {
      return {
        right: item,
        left: evenEl?.find((item2, index2) => index2 === index)
      }
    });
    return formatContent;
  };
  const [selectedDiv, setSelectedDiv] = useState(null);

  const handleFilterPosts = (id) => {
    navigate({
      pathname: location?.pathname,
      search: createSearchParams({
        [type]: id,
      }).toString()
    });
    if (selectedDiv === id) {
      setSelectedDiv(null);
    } else {
      setSelectedDiv(id);
    }
  };
  return (
    <div className='side-bar'>
      <h3 className='title'>{title}</h3>
      {!isDouble &&
        <div>
          {content?.length > 0 && list === 0 && content.map(item => {
            if (item.state === 1) {
              return (
                <div className='tagname'>
                  <Link
                    to={`${formatVietnameseToString(item.name)}`}
                    key={item.id}
                    className='center link hover:bg-secondary1 ' >
                    <p>{item.name}</p>
                  </Link>
                  {samples?.length > 0 && samples.map(items => {
                    if (items.state === 1) {
                      return (
                        <div
                          key={items.id}
                          onClick={() => handleFilterPosts(items.id)}
                          className={`link-child hover:text-blue-500 
                          ${selectedDiv === items.id ? 'bg-[#E0E0E0] font-semibold rounded-md' : ''}`}
                        >
                          {items.idCategory === item.id &&
                            <div className='flex gap-1 items-center'>
                              <AiOutlineCaretRight className="custom-icon" />
                              <p>{items.name}</p>
                            </div>
                          }
                        </div>
                      )
                    } return null
                  })}
                </div>
              )
            }
            return null
          })}
        </div>
      }
      {!isDouble &&
        <div>
          <p className='flex gap-1 items-center font-semibold justify-center cursor-pointer 
          hover:bg-secondary1 py-1' >{texts}</p>
          {content?.length > 0 && list?.length > 0 && content.map(item => {
            if (item.state === 1) {
              return (
                <div className='tagname'>
                  {typesamples?.length > 0 && typesamples.map(items => {
                    return (
                      <div
                        key={items.id}
                        onClick={() => handleFilterPosts(items.id)}
                        className={`link-child hover:text-blue-500 
                        ${selectedDiv === items.id ? 'bg-[#E0E0E0] font-semibold rounded-md' : ''}`}
                      >
                        {categories?.length > 0 && categories.map(itemsss => {
                          return (
                            <div>
                              {items.idCategory === item.id && items.idCategory === itemsss.id && itemsss.name === list &&
                                <div className='flex gap-1 items-center'>
                                  <AiOutlineCaretRight className="custom-icon" />
                                  <p>{items.name}</p>
                                </div>
                              }
                            </div>
                          )
                        })}
                      </div>
                    )
                  })}
                </div>
              )
            } return null
          })}
        </div>
      }

      {isDouble &&
        <div className='flex flex-col gap-1' >
          {content?.length > 0 && formatContent(content).map((item, index) => {
            return (
              <div key={index}>
                <div
                  onClick={() => handleFilterPosts(item.left.id)}
                  className={`flex pl-5 flex-1 gap-1 items-center cursor-pointer hover:text-blue-500 
                    ${selectedDiv === item.left.id ? 'bg-[#E0E0E0] font-semibold rounded-md' : ''}`}
                >
                  <AiOutlineCaretRight className="custom-icon" />
                  <p>{item.left.value}</p>

                </div>
                <div
                  onClick={() => handleFilterPosts(item.right.id)}
                  className={`flex pl-5 flex-1 gap-1 items-center cursor-pointer hover:text-blue-500 
                      ${selectedDiv === item.right.id ? 'bg-[#E0E0E0] font-semibold rounded-md' : ''}`}
                >
                  <AiOutlineCaretRight className="custom-icon" />
                  <p>{item.right.value}</p>
                </div>
              </div>
            )
          })}
        </div>
      }
    </div>
  )
}

export default memo(ItemSidebar)