import React, { memo, useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { formatVietnameseToString } from '../utils/common/formatVietnameseToString'
import { IntlProvider, FormattedNumber } from 'react-intl'
import icons from '../utils/icons'
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../store/actions'
const { AiOutlineHeart, AiFillHeart } = icons;

const Item = ({ image, name, discount, idCategory, nameCategory, price, id, idCurrent }) => {
  const dispatch = useDispatch()
  const { likes } = useSelector(state => state.like)
  const { isLoggedIn } = useSelector(state => state.auth)
  const [isLiked, setIsLiked] = useState(false);
  const [likess, setLikess] = useState([]);
  const url = window.location.href;
  const part = url.split('/');
  const parts = part[part.length - 1]

  const handleLike = (id) => {
    const updatedPayload = {
      idAccount: idCurrent,
      idProduct: id,
    };
    if (Array.isArray(likess)) {
      const existingLikeIndex = likess.findIndex(
        (item) => item.idProduct === id && item.idAccount === idCurrent
      );
      if (existingLikeIndex > -1) {
        setIsLiked(true);
        return;
      }
    }
    dispatch(actions.createLikes(updatedPayload));

    const updatedLikes = [...likess, updatedPayload];
    setLikess(updatedLikes);
    setIsLiked(true);
  };

  const handleUnLike = (id) => {
    const updatedPayload = {
      idAccount: idCurrent,
      idProduct: id,
    };
    dispatch(actions.deleteLikes(updatedPayload));

    const updatedLikes = likess.filter(
      (item) => item.idProduct !== id || item.idAccount !== idCurrent
    );
    setLikess(updatedLikes);

    const hasSomeLikes = updatedLikes.some(
      (item) => item.idProduct === id && item.idAccount === idCurrent
    );
    setIsLiked(hasSomeLikes || false);
  };

  useEffect(() => {
    if (Array.isArray(likes)) {
      const hasLiked = likes.some(
        (item) => item.idProduct === id && item.idAccount === idCurrent
      );
      setIsLiked(hasLiked);
    }
  }, [likes, id, idCurrent]);

  useEffect(() => {
    dispatch(actions.getLikes())
  }, [dispatch])

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='card-items' key={id}>
      {isLoggedIn ? (
        <>
          {isLiked ? (
            <span className="icons" onClick={() => handleUnLike(id)}><AiFillHeart style={{ color: 'red' }} /></span>
          ) : (
            <span className="icons" onClick={() => handleLike(id)}><AiOutlineHeart /></span>
          )}
        </>
      ) : (
        <div className='h-[8%]'></div>
      )}
      <Link onClick={handleClick} to={`/${formatVietnameseToString(nameCategory)}/detail/${formatVietnameseToString(name)}/${id}`}>
        <div className='image center'>
          <img src={`/images/${image}`} alt={name} className='h-[80%] object-cover' />
        </div>
        <div className='content'>
          <span className='center'>{name}</span>
          {discount === 0 ? (
            <div className='tag center'>
              <span className='price '>
                <IntlProvider locale="vi">
                  <FormattedNumber
                    value={price}
                    currency="VND"
                    minimumFractionDigits={0}
                  />đ
                </IntlProvider>
              </span>
            </div>
          ) : (
            <div className='tag center'>
              <span className='price'>
                <IntlProvider locale="vi">
                  <FormattedNumber
                    value={(price * (100 - discount)) / 100}
                    currency="VND"
                    minimumFractionDigits={0}
                  /> đ
                </IntlProvider>
              </span>
              <div className='basicprice-discount'>
                <span className='basic-price'>
                  <IntlProvider locale="vi">
                    <FormattedNumber
                      value={price}
                      currency="VND"
                      minimumFractionDigits={0}
                    /> đ
                  </IntlProvider>
                </span>
                <span className='discount'>-{discount}%</span>
              </div>
            </div>
          )}
        </div>
      </Link>
    </div>
  )
}

export default memo(Item);