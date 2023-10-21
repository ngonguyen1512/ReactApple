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
    <div className='dashboard'>
      <span className='title center'>DASHBOARD</span>
      <div className='dashboard-container'>
        <div className='container'>
          <span className='icons center bg-green-600' style={{ fontSize: '2rem', fontWeight: 'bold' }}><GiMoneyStack /></span>
          <div className='content'>
            <p className='title text-green-800'>Total revenue</p>
            {invoices?.length > 0 && (
              <p className='text-right text-[#000]'>{(invoices.reduce((total, item) => total + item.total, 0)).toLocaleString()} đ</p>
            )}
          </div>
        </div>
        <div className='container'>
          <span className='icons center bg-blue-500' style={{ fontSize: '2rem', fontWeight: 'bold' }}><BsCartCheck /></span>
          <div className='content'>
            <p className='title text-blue-500'>Order</p>
            <p className='text-right text-[#000]'>{countci}</p>
          </div>
        </div>
        <div className='container'>
          <span className='icons center bg-[#101010]' style={{ fontSize: '2rem', fontWeight: 'bold' }}><AiOutlineSetting /></span>
          <div className='content'>
            <p className='title text-[#101010]'>Product</p>
            <p className='text-right text-[#000]'>{countp}</p>
          </div>
        </div>
        <div className='container'>
          <span className='icons center bg-yellow-500' style={{ fontSize: '2rem', fontWeight: 'bold' }}><MdOutlineSwitchAccount /></span>
          <div className='content'>
            <p className='title text-yellow-500'>Account</p>
            <p className='text-right text-[#000]'>{countca}</p>
          </div>
        </div>
      </div>
      <div className='div-table'>
        <span className='title'>TOP BEST SELLER</span>
        <div className='form-search'>
          <input type='date' className='input'></input>
          <Button
            text='Search'
            bgColor='bg-secondary2'
            textColor='text-white'
          // onClick={() => setIsShowCreate(prev => !prev)}
          />
        </div>
        <div className='table-bestseller'>
          <table className='w-full'>
            <thead>
              <tr>
                <th>ID</th>
                <th>IMAGE</th>
                <th>NAME</th>
                <th>TOTALSOLD</th>
                <th>PRICE</th>
              </tr>
            </thead>
            <tbody>
              {topselling?.length > 0 && topselling.map(item => {
                return (
                  <tr>
                    <td className='text-center'>{item?.product_invoicedetail.id}</td>
                    <td className='text-center w-[12%]'>
                      <img src={item?.product_invoicedetail.image} alt={item?.product_invoicedetail.name} className='w-[100%] object-cover' />
                    </td>
                    <td>{item?.product_invoicedetail.name}</td>
                    <td className='text-center'>{item.totalSold}</td>
                    <td className='text-center'>{(item?.product_invoicedetail.price).toLocaleString()}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className='newinvoice'>
          <table className='w-full'>
            <thead>
              <tr>
                <th>ID BILL</th>
                <th>ID & Name</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoices?.length > 0 && invoices.map(item => {
                if (item.state === 1) {
                  return (
                    <tr>
                      <td className='text-center'>{item.id}</td>
                      <td>{item?.account_invoice.id} - {item?.account_invoice.name}</td>
                      <td className='text-center'>{(item.total).toLocaleString()}</td>
                    </tr>
                  )
                }
                return null
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Dashboard