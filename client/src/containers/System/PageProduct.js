import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { InputForm, Button, UpdateP, CreateP } from '../../components/index'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { path } from '../../utils/constant';

const PageProduct = () => {
  const { products, msg, update } = useSelector(state => state.product)
  // const path = window.location.pathname.split('/').pop();

  const url = window.location.href;
  const parts = url.split('/');
  const payloadid = parseInt(parts[parts.length - 1]);

  return (
    <div className='w-full p-2 my-10'>
      <span className='text-4xl font-bold tracking-widest justify-center items-center'>CREATE PRODUCT</span>
      <div className='mt-5'>
        {!payloadid &&
          <CreateP />
        }
        {payloadid && products?.length > 0 && products.map(item => {
          if (item.id === payloadid) {
            return (
              <UpdateP
                key={item?.id}
                id={item?.id}
                name={item?.name}
                quantity={item?.quantity}
                discount={item?.discount}
                price={item?.price}
                idProvider={item?.idProvider}
                state={item?.state}
              />
            )
          }
          return null
        })}
      </div>
    </div>
  )
}

export default PageProduct