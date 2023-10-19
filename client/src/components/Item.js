import React, { memo } from 'react'
import { Link } from 'react-router-dom';
import { formatVietnameseToString } from '../utils/common/formatVietnameseToString'
import { IntlProvider, FormattedNumber } from 'react-intl'
import icons from  '../utils/icons'

const { AiOutlineHeart } = icons;

const Item = ({ image, name, discount, nameCategory, price, id, }) => {
  return (
    <div>
      <div className='card-items'>
        <span className='icons'><AiOutlineHeart/></span>
        <Link to={`${formatVietnameseToString(nameCategory)}/detail/${formatVietnameseToString(name)}/${id}`}>
          <div className='image'>
            <img src={image} alt={name} className='h-[80%] object-cover' />
          </div>
          <div className='content'>
            <span>{name}</span>
            {discount === 0 &&
              <div className='tag'>
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
              <div className='tag'>
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
    </div>
  )
}

export default memo(Item);