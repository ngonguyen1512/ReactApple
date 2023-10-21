import React, { memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { formatVietnameseToString } from '../utils/common/formatVietnameseToString'
import { IntlProvider, FormattedNumber } from 'react-intl'
import icons from '../utils/icons'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions'

const { AiOutlineHeart, AiFillHeart } = icons;

const Sitem = ({ image, nameCategory, name, discount, price, id, idCurrent }) => {
  const dispatch = useDispatch()
  const { likes } = useSelector(state => state.like)
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [payload, setPayload] = useState({
    idAccount: '',
    idProduct: ''
  });
  const handleLike = (id) => {
    setPayload({
      ...payload, idAccount: idCurrent, idProduct: id
    });
    dispatch(actions.createLikes(payload))
    setShouldRefetch(true);
    setIsLiked(true);
  }
  let hasSomeLikes = false;
  if (Array.isArray(likes)) {
    for (let i = 0; i < likes.length; i++) {
      const item = likes[i];
      if (item.idProduct === id && item.idAccount === idCurrent) {
        hasSomeLikes = true;
        break;
      }
    }
  }

  useEffect(() => {
    dispatch(actions.getLikes())
  }, [dispatch])
  useEffect(() => {
    if (shouldRefetch) {
      dispatch(actions.getLikes())
      setShouldRefetch(false);
    }
  }, [dispatch, shouldRefetch])

  return (
    <div className='card-items'>
      {hasSomeLikes ? (
        <span className='icons'><AiFillHeart /></span>
      ) : (
        <span className='icons' onClick={() => handleLike(id)}><AiOutlineHeart /></span>
      )}
      <Link to={`${formatVietnameseToString(nameCategory)}/detail/${formatVietnameseToString(name)}/${id}`}>
        <div className='image center'>
          <img src={image} alt={name} className='h-[80%] object-cover' />
        </div>
        <div className='content'>
          <span className='center'>{name}</span>
          {discount === 0 &&
            <div className='tag center'>
              <span className='price'>
                <IntlProvider locale="vi">
                  <FormattedNumber
                    value={price}
                    currency="VND"
                    minimumFractionDigits={0}
                  />
                </IntlProvider>
              </span>
            </div>
          }
          {discount !== 0 &&
            <div className='tag center'>
              <span className='price'>
                <IntlProvider locale="vi">
                  <FormattedNumber
                    value={(price * (100 - discount)) / 100}
                    currency="VND"
                    minimumFractionDigits={0}
                  />
                </IntlProvider>
              </span>
              <div className='basicprice-discount'>
                <span className='basic-price'>
                  <IntlProvider locale="vi">
                    <FormattedNumber
                      value={price}
                      currency="VND"
                      minimumFractionDigits={0}
                    />
                  </IntlProvider>
                </span>
                <span className='discount'>-{discount}%</span>
              </div>
            </div>
          }
        </div>
      </Link>
    </div>
  )
}

export default memo(Sitem)