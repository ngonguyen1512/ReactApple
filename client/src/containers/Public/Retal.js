import React, { useEffect, useState } from 'react';
import { ItemSidebar  } from '../../components';
import { List, Pagination } from './index';
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {formatVietnameseToString} from '../../utils/common/formatVietnameseToString'

const Retal = () => {
  const { categories, prices } = useSelector(state => state.app)
  const { countp, products } = useSelector(state => state.product)
  const [currentPage, setCurrentPage] = useState(1);
  const [idCategory, setIdCategory] = useState('none');
  const location = useLocation()
  const path = location.pathname;
  const parts = path.split('/');
  const lastPart = parts[parts.length - 1];
  
  useEffect(() => {
    const category = categories?.find(item => `/${formatVietnameseToString(item.name)}` === location.pathname)
    if(category) setIdCategory(category.id)
  }, [location.pathname, categories]);

  return (
    <div className='rental center'>
      <p className='title center'>{lastPart}</p>
      <div className='main-rental'>
        <div className='side-bar'>
          <ItemSidebar content={categories} type='sample' list={lastPart} texts={lastPart} title='Product list'/>
          <ItemSidebar isDouble={true} type='code' content={prices} title='Sort by price'/>
        </div>
        <div className='main-retal-content' >
          <List category={idCategory} />
          <Pagination count={countp} currentPage={currentPage}
            setCurrentPage={setCurrentPage} counts={products} />
        </div>
      </div>
    </div>
  )
}

export default Retal