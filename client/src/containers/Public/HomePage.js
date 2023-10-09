import React, { useEffect } from 'react';
import { Slider, ItemSidebar  } from '../../components';
import { List, Pagination, RelatedProduct  } from './index';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const HomePage = () => {
  const dispatch = useDispatch();
  const { countp } = useSelector(state => state.product)
  const { categories, prices } = useSelector(state => state.app)
  useEffect(() => {
    dispatch(actions.getPrices());
  });
 
  return (
    <div className='w-full flex flex-col justify-center'>
      <Slider />
      <RelatedProduct />
      <div className='w-[100%] flex gap-1'>
        <div className='w-[24%] flex flex-col gap-4 mt-4 mb-5 items-center justify-start'>
          <ItemSidebar content={categories} type='sample' list={0} title='Danh sách sản phẩm'/>
          <ItemSidebar isDouble={true} type='code' content={prices} title='Xem theo giá'/>
        </div>
        <div className='w-[76%] ' >
          <List />
          <Pagination count={countp}/>
        </div>
      </div>
    </div>
  )
}
export default HomePage;