import React, { useEffect } from 'react'
import { Sitem } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const ItemNewProduct = () => {
  const dispatch = useDispatch();
  const { newProducts } = useSelector(state => state.product);
  const { currentData } = useSelector(state => state.user)
  const idcurrent = parseInt(currentData.id)

  useEffect(() => {
    dispatch(actions.getNewProducts());
  }, [dispatch]);

  return (
    <div className="related-product">
      <p>NEW PRODUCTS</p>
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
            idCurrent={idcurrent}
            id={item?.id}
          />
        )
      })}
    </div>
  )
}

export default ItemNewProduct