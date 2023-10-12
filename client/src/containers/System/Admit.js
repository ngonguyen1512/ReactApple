import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams, Link } from 'react-router-dom'
import { Button } from '../../components/index'
import * as actions from '../../store/actions'
import { formatVietnameseToString } from '../../utils/common/formatVietnameseToString'

const Import = () => {
  const dispatch = useDispatch()
  const [searchParmas] = useSearchParams()
  const [isShowDetail, setIsShowDetail] = useState(false)
  const { functions } = useSelector(state => state.function)
  const { currentData } = useSelector(state => state.user)
  const permis = currentData.idPermission

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
    dispatch(actions.getFunctions(searchParamsObject))
    dispatch(actions.getPermissions())
  }, [searchParmas, permis, dispatch])

  return (
    <div className='w-full p-2 my-10'>
      <span className='text-4xl font-bold tracking-widest justify-center items-center'>ADMIT</span>
      <div className='mt-5'>
        {functions?.length > 0 && functions.map(item => item.name === 'Create' && item.idPermission === 1 && (
          <Link to={`${formatVietnameseToString(item.name)}-admit`}>
            <Button
              text={item.name}
              bgColor='bg-secondary2'
              textColor='text-white'
            />
          </Link>
        ))}
      </div>
      <div className='mt-3 grid grid-cols-2 gap-2'>
        <div className='w-full h-40 overflow-auto border rounded-sm'>
          <table className='w-full'>
            <tr>
              <th>ID</th>
              <th>Create At</th>
              <th>ID Provider</th>
              <th>ID & Name</th>
              <th>Totality</th>
              <th>Refuse</th>
              <th>Accept</th>
            </tr>
            <tr className='cursor-pointer' onClick={() => setIsShowDetail(prev => !prev)}>
              <td className='text-center'>1</td>
              <td className='text-center'>28/9/2023</td>
              <td className='text-center'>1</td>
              <td>5 - Nguyen Van A</td>
              <td className='text-center'>23,990,000</td>
              <th className='text-red-500'>No</th>
              <th className='text-secondary'>Yes</th>
            </tr>
          </table>
        </div>
        <div className='w-full h-40 overflow-auto border rounded-sm '>
          <table className='w-full'>
            <tr>
              <th className='w-[8%]'>IDSP</th>
              <th className='w-[34%]'>Name</th>
              <th className='w-[8%]'>Quantity</th>
              <th className='w-[25%]'>Price</th>
              <th className='w-[25%]'>Total</th>
            </tr>
            {isShowDetail &&
              <tr>
                <td className='text-center'>4</td>
                <td className='pl-1'>iPhone 13</td>
                <td className='text-center'>1</td>
                <td className='text-center'>23,990,000</td>
                <td className='text-center text-red-500'>23,990,000</td>
              </tr>
            }
          </table>
        </div>
      </div>
      <div className='mt-3 grid grid-cols-3 gap-2'>
        <div className='col-span-2'>
          <p className='text-lg font-semibold tracking-wider'>ALL INVOICES</p>
        </div>
        <div className='col-span-1 flex flex-col-2 gap-2'>
          <input type='text' placeholder='Search...' className='border rounded-md w-full' />
          <Button text='Search' bgColor='bg-secondary2' textColor='text-white' />
        </div>
        <div className='col-span-3 h-72 w-full border rounded-md'>
          <table className='w-full overflow-auto'>
            <tr>
              <th>ID</th>
              <th>Create At</th>
              <th>Provider Name</th>
              <th>ID & Name</th>
              <th>Totality</th>
              <th>ID Confirm</th>
              <th>State</th>
            </tr>
            <tr className='cursor-pointer' onClick={() => setIsShowDetail(prev => !prev)}>
              <td className='text-center'>1</td>
              <td className='text-center'>28/9/2023</td>
              <td className='pl-1'>Apple USA</td>
              <td className='pl-1'>5 - Nguyen Van A</td>
              <td className='text-center'>23,990,000</td>
              <td className='text-center'>2</td>
              <td className='text-center'>Thành công</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Import