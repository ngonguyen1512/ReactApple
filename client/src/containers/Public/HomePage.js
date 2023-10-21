import React, { useEffect, useState } from 'react';
import { ItemSidebar } from '../../components';
import { List, Pagination, RelatedProduct } from './index';
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const HomePage = () => {
  const dispatch = useDispatch();
  const { countp, products } = useSelector(state => state.product)
  const [currentPage, setCurrentPage] = useState(1);
  const { categories, prices } = useSelector(state => state.app)
  useEffect(() => {
    dispatch(actions.getPrices());
  }, [dispatch]);

  return (
    <div className='homepage center'>
      <RelatedProduct />
      <div className='main-content'>
        <div className='sidebar'>
          <ItemSidebar content={categories} type='sample' list={0} title='Product list' />
          <ItemSidebar isDouble={true} type='code' content={prices} title='Sort by price' />
        </div>
        <div className='list-pagination' >
          <List />
          <Pagination count={countp} currentPage={currentPage}
            setCurrentPage={setCurrentPage} counts={products} />
        </div>
      </div>
    </div>
  )
}
export default HomePage;