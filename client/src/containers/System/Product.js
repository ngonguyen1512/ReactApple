import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, Link } from 'react-router-dom'
import icons from '../../utils/icons'
import { Button } from '../../components/index'
import { Pagination } from './index'
import * as actions from '../../store/actions'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'

const { BiEdit } = icons
const styletd = 'text-center text-base px-4 py-2'

const Product = () => {
  const dispatch = useDispatch()
  const [searchParmas] = useSearchParams()
  const { countp, products } = useSelector(state => state.product)
  const { functions } = useSelector(state => state.function)
  const { currentData } = useSelector(state => state.user)
  const permis = currentData.idPermission
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let page = searchParmas.get('page');
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [searchParmas, products, currentPage]);

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
    if (permis) searchParamsObject.permis = permis
    dispatch(actions.getProductsLimit(searchParamsObject))
    dispatch(actions.getFunctions(searchParamsObject))
    dispatch(actions.getPermissions())
  }, [searchParmas, permis, dispatch])

  return (
    <div className='w-full p-2 my-10'>
      <span className='text-4xl font-bold tracking-widest justify-center items-center'>PRODUCT</span>
      <div className='mt-5'>
        {functions?.length > 0 && functions.map(item => item.name === 'Create' && (
          <Link to={`${formatVietnameseToString(item.name)}-product`}>
            <Button
              text={item.name}
              bgColor='bg-secondary2'
              textColor='text-white'
            />
          </Link>
        ))}
      </div>
      <div className='mt-5'>
        <table className='w-full border-collapse border-2 '>
          <tr>
            <th className='text-lg'>ID</th>
            <th className='text-lg w-[10%]'>IMAGE</th>
            <th className='text-lg'>NAME</th>
            <th className='text-lg'>ID CATEGORY</th>
            <th className='text-lg'>QUANTITY</th>
            <th className='text-lg'>DISCOUNT</th>
            <th className='text-lg'>PRICE</th>
            <th className='text-lg'>STATE</th>
            {functions?.length > 0 && functions.map(item => item.name === 'Edit' && (
              <th className='text-lg'>{item.name}</th>
            ))}
          </tr>
          {products?.length > 0 && products.map(item => {
            return (
              <tr>
                <td className={styletd}>{item.id}</td>
                <td className='w-[10%]'>
                  <img src={item.image} alt={item.name} className='w-[100%] object-cover' />
                </td>
                <td className='px-4 py-2'>{item.name}</td>
                <td className={styletd}>{item.idCategory}</td>
                <td className={styletd}>{item.quantity}</td>
                <td className={styletd}>{item.discount}</td>
                <td className={styletd}>{item.price}</td>
                <td className={styletd}>{item.state}</td>
                {functions?.length > 0 && functions.map(items => items.name === 'Edit' && (
                  <th className='flex justify-center items-center text-center text-2xl py-10'>
                    <Link to={`${formatVietnameseToString(items.name)}-product/${item.id}`}>
                      <Button  IcAfter={BiEdit} textColor='text-secondary'/>
                    </Link>
                  </th>
                ))}
              </tr>
            )
          })}

        </table>
      </div>
      <Pagination count={countp} currentPage={currentPage}
        setCurrentPage={setCurrentPage} counts={products} />
    </div>
  )
}

export default Product