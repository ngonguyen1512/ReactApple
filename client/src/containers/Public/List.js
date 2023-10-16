import React, { useEffect } from 'react'
import { Item } from '../../components'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const List = ({ category }) => {

  const dispatch = useDispatch();
  const [searchParmas] = useSearchParams();
  const { products } = useSelector(state => state.product);

  useEffect(() => {
    let params = [];
    for (let entry of searchParmas.entries()) params.push(entry);
    let searchParamsObject = {}
    params?.forEach(i => {
      if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
      } else {
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
      }
    })
    if (category) searchParamsObject.category = category
    dispatch(actions.getProductsLimit(searchParamsObject));
  }, [searchParmas, category, dispatch]);

  return (
    <div className='w-full p-2'>
      <p className='text-xl font-semibold tracking-wider'>ALL PRODUCTS</p>
      <div className='w-full grid grid-cols-3 gap-2 items-center justify-between'>
        {products?.length > 0 && products.map(item => item.state === 1 &&
          <Item
            key={item?.id}
            name={item?.name}
            discount={item?.discount}
            price={item?.price}
            image={item?.image}
            idCategory={item?.idCategory}
            nameCategory={item?.categories?.name}
            id={item?.id}
            item={item}
          />
        )}
      </div>
    </div>
  )
}

export default List