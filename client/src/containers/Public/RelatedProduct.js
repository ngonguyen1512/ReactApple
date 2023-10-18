import React, { useEffect } from 'react'
import { Sitem } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const ItemNewProduct = () => {
  const dispatch = useDispatch();
  const { newProducts } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(actions.getNewProducts());
  }, [dispatch]);

  return (
    <div className="w-full bg-[#161616] py-4 px-2 my-5 rounded-3xl ">
      <p className='font-bold text-2xl text-center text-white tracking-wider'>NEW PRODUCTS</p>
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