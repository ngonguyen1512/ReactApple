import React, { useEffect, useState } from 'react';
import { ItemSidebar  } from '../../components';
import { List, Pagination } from './index';
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {formatVietnameseToString} from '../../utils/common/formatVietnameseToString'

const Retal = () => {
  const { categories, prices } = useSelector(state => state.app)
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
    <div className='w-full flex flex-col justify-center'>
      <p className="flex my-10 font-bold uppercase text-4xl tracking-widest justify-center items-center">{lastPart}</p>
      <div className='w-[100%] flex gap-1'>
        <div className='w-[24%] flex flex-col gap-4 mb-5 items-center justify-start'>
          <ItemSidebar content={categories} type='sample' list={lastPart} texts={lastPart} title='Product list'/>
          <ItemSidebar isDouble={true} type='code' content={prices} title='Sort by price'/>
        </div>
        <div className='w-[76%]' >
          <List category={idCategory} />
          <Pagination />
        </div>
      </div>
    </div>
  )
}

export default Retal