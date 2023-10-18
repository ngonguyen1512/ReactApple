import React, { useEffect, useState } from 'react';
import { PageNumber } from '../../components';
import { useSelector } from 'react-redux';
import icons from '../../utils/icons';
import { useSearchParams } from 'react-router-dom';

const { GrNext, GrPrevious } = icons;

const Pagination = () => {
  const [searchParams] = useSearchParams();
  const { count, products } = useSelector(state => state.product);
  const [arrPage, setArrPage] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isHideEnd, setIsHideEnd] = useState(false);
  const [isHideStart, setIsHideStart] = useState(false);

  useEffect(() => {
    let page = searchParams.get('page');
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [searchParams, currentPage]);

  useEffect(() => {
    let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_PRODUCTS);
    let end = (currentPage + 2) > maxPage ? maxPage : (currentPage + 2)
    let start = (currentPage - 2) <= 1 ? 1 : (currentPage - 2)
    let temp = [];
    for (let i = start; i <= end; i++)
      temp.push(i);
    setArrPage(temp);
    currentPage >= (maxPage - 2) ? setIsHideEnd(true) : setIsHideEnd(false)
    currentPage <= 3 ? setIsHideStart(true) : setIsHideStart(false)
  }, [count, currentPage]);

  return (
    <div className='mt-10 flex items-center justify-center gap-2'>
      {!isHideStart && <PageNumber icon={<GrPrevious />} text={1} setCurrentPage={setCurrentPage} />}
      {!isHideStart && <PageNumber text={'...'} />}
      {arrPage.length > 0 && arrPage.map(item => {
        return (
          <PageNumber
            key={item}
            text={item}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )
      })}
      {!isHideEnd && <PageNumber text={'...'} />}
      {!isHideEnd &&
        <PageNumber
          icon={<GrNext />}
          text={Math.ceil(count / products.length)}
          setCurrentPage={setCurrentPage}
          type='end'
        />
      }
    </div>
  )
}

export default Pagination