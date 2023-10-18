import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import icons from '../../utils/icons'
import * as actions from '../../store/actions'
import { Button } from '../../components/index'

const { BsCartCheck, AiOutlineSetting, MdOutlineSwitchAccount, GiMoneyStack } = icons

const Dashboard = () => {
  const dispatch = useDispatch();
  const { countp } = useSelector(state => state.product)
  const { countca } = useSelector(state => state.account)
  const { topselling, invoices, countci } = useSelector(state => state.invoice)

  useEffect(() => {
    dispatch(actions.getProductsLimit())
    dispatch(actions.getCountAccounts())
    dispatch(actions.getCountInvoices())
    dispatch(actions.getTopSelling())
  }, [dispatch])

  return (
    <div className='w-full p-2 my-10'>
      <span className='text-4xl font-bold tracking-widest justify-center items-center'>DASHBOARD</span>
      <div className='mt-5 grid grid-cols-4 gap-2 items-center justify-between'>
        <div className='w-full m-2 flex rounded-xl shadow-md border'>
          <span className='w-[30%] bg-green-600 items-center justify-center flex rounded-l-lg text-white' style={{ fontSize: '2rem', fontWeight: 'bold' }}><GiMoneyStack /></span>
          <div className='w-[70%] p-3'>
            <p className='text-xl font-semibold tracking-wider text-green-800'>Total revenue</p>
            {invoices?.length > 0 && (
              <p className='text-right'>{(invoices.reduce((total, item) => total + item.total, 0)).toLocaleString()} đ</p>
            )}
          </div>
        </div>
        <div className='w-full m-2 flex rounded-xl shadow-md border'>
          <span className='w-[30%] bg-blue-500 items-center justify-center flex rounded-l-lg text-white' style={{ fontSize: '2rem', fontWeight: 'bold' }}><BsCartCheck /></span>
          <div className='w-[70%] p-3'>
            <p className='text-xl font-semibold tracking-wider text-blue-500'>Order</p>
            <p className='text-right'>{countci}</p>
          </div>
        </div>
        <div className='w-full m-2 flex rounded-xl shadow-md border'>
          <span className='w-[30%] bg-gray-600 items-center justify-center flex rounded-l-lg text-white' style={{ fontSize: '2rem', fontWeight: 'bold' }}><AiOutlineSetting /></span>
          <div className='w-[70%] p-3'>
            <p className='text-xl font-semibold tracking-wider text-gray-600'>Product</p>
            <p className='text-right'>{countp}</p>
          </div>
        </div>
        <div className='w-full m-2 flex rounded-xl shadow-md border'>
          <span className='w-[30%] bg-yellow-500 items-center justify-center flex rounded-l-lg text-white' style={{ fontSize: '2rem', fontWeight: 'bold' }}><MdOutlineSwitchAccount /></span>
          <div className='w-[70%] p-3'>
            <p className='text-xl font-semibold tracking-wider text-yellow-500'>Account</p>
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
                <th>IMAGE</th>
                <th>NAME</th>
                <th>TOTALSOLD</th>
                <th>PRICE</th>
              </tr>

              {topselling?.length > 0 && topselling.map(item => {
                return (
                  <tr>
                    <td className='text-center'>{item?.product_invoicedetail.id}</td>
                    <td className='text-center w-[12%]'>
                      <img src={item?.product_invoicedetail.image} alt={item?.product_invoicedetail.name} className='w-[100%] object-cover' />
                    </td>
                    <td>{item?.product_invoicedetail.name}</td>
                    <td>{item.totalSold}</td>
                    <td className='text-center'>{item?.product_invoicedetail.price}</td>
                  </tr>
                )
              })}
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
                <th>ID BILL</th>
                <th>ID & Name</th>
                <th>Total</th>
              </tr>
              {invoices?.length > 0 && invoices.map(item => {
                if (item.state === 1) {
                  return (
                    <tr>
                      <td className='text-center'>{item.id}</td>
                      <td>{item?.account_invoice.id} - {item?.account_invoice.name}</td>
                      <td className='text-center'>{item.total}</td>
                    </tr>
                  )
                }
                return null
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard