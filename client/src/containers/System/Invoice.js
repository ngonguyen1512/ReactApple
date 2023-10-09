import React, { useState } from 'react'
import { Button } from '../../components/index'

const Invoice = () => {
  const [isShowDetail, setIsShowDetail] = useState(false)

  return (
    <div className='w-full p-2 my-10'>
      <span className='text-4xl font-bold tracking-widest justify-center items-center'>INVOICE</span>
      <div className='mt-4 grid grid-cols-2 gap-2'>
        <div className='w-full h-52 overflow-auto border rounded-sm'>
          <table className='w-full'>
            <tr>
              <th>ID</th>
              <th>Create At</th>
              <th>ID & Name</th>
              <th>Totality</th>
              <th>Refuse</th>
              <th>Accept</th>
            </tr>
            <tr className='cursor-pointer' onClick={() => setIsShowDetail(prev => !prev)}>
              <td className='text-center'>1</td>
              <td className='text-center'>28/9/2023</td>
              <td className='pl-1'>5 - Nguyen Van A</td>
              <td className='text-center'>23,990,000</td>
              <th className='text-red-500'>No</th>
              <th className='text-secondary'>Yes</th>
            </tr>
          </table>
        </div>
        <div className='w-full h-52 overflow-auto border rounded-sm '>
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
      <div className='mt-4 grid grid-cols-3 gap-2'>
        <div className='col-span-2'>
          <p className='text-lg font-semibold tracking-wider'>ALL INVOICES</p>
        </div>
        <div className='col-span-1 flex flex-col-2 gap-2'>
          <input type='text' placeholder='Search...' className='border rounded-md w-full' />
          <Button text='Search' bgColor='bg-secondary2' textColor='text-white' />
        </div>
        <div className='col-span-3 w-full border rounded-md'>
          <table className='w-full'>
            <tr>
              <th>ID</th>
              <th>Create At</th>
              <th>ID & Name</th>
              <th>Totality</th>
              <th>ID Confirm</th>
              <th>State</th>
            </tr>
            <tr className='cursor-pointer' onClick={() => setIsShowDetail(prev => !prev)}>
              <td className='text-center'>1</td>
              <td className='text-center'>28/9/2023</td>
              <td>5 - Nguyen Van A</td>
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

export default Invoice