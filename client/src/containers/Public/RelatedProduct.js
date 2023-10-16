import React, { useEffect } from 'react'
import { Sitem } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const ItemNewProduct = () => {
  const dispatch = useDispatch();
  const { newProducts } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(actions.getNewProducts());
  });

  return (
    <div className="w-full bg-red-500 py-4 px-2 my-2 rounded-lg ">
      <p className='font-semibold text-lg tracking-wide'>TOP 4 NEW PRODUCTS</p>
      {newProducts?.length > 0 && newProducts.map(item => {
          return ( 
            <Sitem
              key={item?.id}
              name={item?.name}
              discount={item?.discount}
              price={item?.price}
              image={item?.image}
              createdAt={item.createdAt}
              idCategory={item?.idCategory}
              nameCategory={item?.categories?.name}
              id={item?.id}
            />
          )
        })}
    </div>
  )
}

export default ItemNewProduct