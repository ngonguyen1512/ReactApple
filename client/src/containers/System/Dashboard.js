import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import icons from '../../utils/icons'
import * as actions from '../../store/actions'
import { Button } from '../../components/index'

const { BsCartCheck, TbPackageImport, AiOutlineSetting, MdOutlineSwitchAccount, GiMoneyStack } = icons

const Dashboard = () => {
  const dispatch = useDispatch();
  const { countp } = useSelector(state => state.product)
  const { countca } = useSelector(state => state.account)
  const { countci } = useSelector(state => state.invoice)
  useEffect(() => {
    dispatch(actions.getProductsLimit())
    dispatch(actions.getCountAccounts())
    dispatch(actions.getCountInvoices())
  })

  return (
    <div className='w-full p-2 my-10'>
      <span className='text-4xl font-bold tracking-widest justify-center items-center'>DASHBOARD</span>
      <div className='mt-5 grid grid-cols-4 gap-2 items-center justify-between'>
        <div className='w-full m-2 flex col-span-2 rounded-xl shadow-md border'>
          <span className='w-[30%] bg-green-800 items-center justify-center flex rounded-l-lg text-white' style={{ fontSize: '4rem', fontWeight: 'bold' }}><GiMoneyStack /></span>
          <div className='w-[70%] px-5 py-3'>
            <p className='text-3xl font-semibold tracking-wider text-green-800'>Tổng Doanh Thu</p>
            <p className='text-right text-2xl font-semibold text-red-500 mt-4'>41,980,000</p>
          </div>
        </div>
        <div className='w-full col-span-2'></div>
        <div className='w-full m-2 flex rounded-xl shadow-md border'>
          <span className='w-[30%] bg-blue-500 items-center justify-center flex rounded-l-lg text-white' style={{ fontSize: '2rem', fontWeight: 'bold' }}><BsCartCheck /></span>
          <div className='w-[70%] p-3'>
            <p className='text-xl font-semibold tracking-wider text-blue-500'>Đơn Hàng</p>
            <p className='text-right'>{countci}</p>
          </div>
        </div>
        <div className='w-full m-2 flex rounded-xl shadow-md border'>
          <span className='w-[30%] bg-green-600 items-center justify-center flex rounded-l-lg text-white' style={{ fontSize: '2rem', fontWeight: 'bold' }}><TbPackageImport /></span>
          <div className='w-[70%] p-3'>
            <p className='text-xl font-semibold tracking-wider text-green-600'>Nhập Hàng</p>
            {/* <p className='text-right'>{countcad}</p> */}
          </div>
        </div>
        <div className='w-full m-2 flex rounded-xl shadow-md border'>
          <span className='w-[30%] bg-gray-600 items-center justify-center flex rounded-l-lg text-white' style={{ fontSize: '2rem', fontWeight: 'bold' }}><AiOutlineSetting /></span>
          <div className='w-[70%] p-3'>
            <p className='text-xl font-semibold tracking-wider text-gray-600'>Sản Phẩm</p>
            <p className='text-right'>{countp}</p>
          </div>
        </div>
        <div className='w-full m-2 flex rounded-xl shadow-md border'>
          <span className='w-[30%] bg-yellow-500 items-center justify-center flex rounded-l-lg text-white' style={{ fontSize: '2rem', fontWeight: 'bold' }}><MdOutlineSwitchAccount /></span>
          <div className='w-[70%] p-3'>
            <p className='text-xl font-semibold tracking-wider text-yellow-500'>Tài khoản</p>
            <p className='text-right'>{countca}</p>
          </div>
        </div>
      </div>
      <div className='my-5 grid grid-cols-5 gap-2 pl-3'>
        <div className='w-full col-span-3'>
          <span className='font-semibold tracking-wider text-lg'>TOP BEST SELLER</span>
          <div className='w-full border rounded-md shadow-md'>
            <table className='w-full '>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
              </tr>
              <tr>
                <td className='text-center'>1</td>
                <td className='text-center'>afd</td>
                <td>iPhone 13</td>
                <td className='text-center'>23,990,000</td>
              </tr>
            </table>
          </div>
        </div>
        <div className='w-full col-span-2 pl-3'>
          <div className='flex'>
            <input type='date' className='w-full text-center'></input>
            <Button
              text='Search'
              bgColor='bg-secondary2'
              textColor='text-white'
              // onClick={() => setIsShowCreate(prev => !prev)}
            />
          </div>
          <div className='w-full mt-3 border rounded-md shadow-sm'>
            <table className='w-full'>
              <tr>
                <th>ID</th>
                <th>ID & Name</th>
                <th>Total</th>
              </tr>
              <tr>
                <td className='text-center'>1</td>
                <td>5 - Nguyen Van A</td>
                <td className='text-center'>23,990,000</td>
              </tr>
              <tr>
                <td className='text-center'>2</td>
                <td>7 - Le Thi Rieng</td>
                <td className='text-center'>17,990,000</td>
              </tr>
              <tr>
                <th colSpan={2}>Totality</th>
                <th className='text-secondary'>41,980,000</th>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard