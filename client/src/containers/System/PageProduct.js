import React from 'react'
import { useSelector } from 'react-redux'
import { UpdateP, CreateP } from '../../components/index'

const PageProduct = () => {
  const { products } = useSelector(state => state.product)
  const url = window.location.href;
  const parts = url.split('/');
  const payloadid = parseInt(parts[parts.length - 1]);

  return (
    <div className='page-product'>
      <div className='mt-5'>
        {payloadid && products?.length > 0 && products.map(item => {
          if (item.id === payloadid)
            return (
              <>
                <span className='title mb-5'>EDIT PRODUCT</span>
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
              </>
            )
          return null
        })}
        {!payloadid && <>
          <span className='title mb-5'>CREATE PRODUCT</span>
          <CreateP />
        </>
        }
      </div>
    </div >
  )
}

export default PageProduct