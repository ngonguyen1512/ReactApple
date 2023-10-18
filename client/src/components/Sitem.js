import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { formatVietnameseToString } from '../utils/common/formatVietnameseToString';
import { IntlProvider, FormattedNumber } from 'react-intl';

const Sitem = ({image, nameCategory, name, discount, price, id, createdAt}) => {
  return (
    <div className='inline-block h-80 w-72 mx-1 mt-4 bg-[#323232] items-center justify-between rounded-3xl hover:shadow-lg hover:shadow-white'>
      <Link to={`${formatVietnameseToString(nameCategory)}/detail/${formatVietnameseToString(name)}/${id}`}>
        <div className='h-[70%] flex items-center justify-center'>
          <img  src={image} alt={name} className='h-[80%] object-cover'/>
        </div>
        <div className='h-[30%] text-white'>
          <span className='flex justify-center items-center text-sm'>{name}</span>
          {discount === 0 &&
            <div className='flex justify-center items-center mt-2'>
              <span className='text-lg font-semibold m-px'>
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
            <div className='flex justify-center items-center mt-2'>
              <span className='text-lg font-semibold m-px'>
                <IntlProvider locale="vi">
                  <FormattedNumber
                    value={(price*(100-discount))/100}
                    currency="VND"
                    minimumFractionDigits={0}
                  />
                </IntlProvider> 
              </span>
              <span className='line-through text-xs m-px text-blue-500'>
                <IntlProvider locale="vi">
                  <FormattedNumber
                    value={price}
                    currency="VND"
                    minimumFractionDigits={0}
                  />
                </IntlProvider>
              </span>
              <span className='m-px text-red-500 font-semibold text-base'>-{discount}%</span>
            </div>
          }
        </div>
      </Link>
    </div>
  )
}

export default memo(Sitem)