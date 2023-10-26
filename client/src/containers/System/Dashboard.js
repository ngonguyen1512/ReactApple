import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import icons from '../../utils/icons'
import * as actions from '../../store/actions'
import { RevenueChart, Chart } from '../../components/index'

const { BsCartCheck, AiOutlineSetting, MdOutlineSwitchAccount, GiMoneyStack } = icons

const Dashboard = () => {
  const dispatch = useDispatch();
  const { countp } = useSelector(state => state.product)
  const { countca } = useSelector(state => state.account)
  const { topselling, invoices, countci } = useSelector(state => state.invoice)
  const [selectedDate, setSelectedDate] = useState('');
  const [shouldReload, setShouldReload] = useState(false);

  const handleSearch = (event) => {
    setSelectedDate(event.target.value);
    setShouldReload(event.target.value !== "");
  };

  let filteredInvoice = [];
  if (invoices && Array.isArray(invoices)) {
    filteredInvoice = invoices.filter((item) =>
      item.createdAt.includes(selectedDate)
    );
  }
  let filteredTop = [];
  if (topselling && Array.isArray(topselling)) {
    filteredTop = topselling.filter((item) =>
      item.createdAt.includes(selectedDate)
    );
  }

  useEffect(() => {
    dispatch(actions.getProductsLimit())
    dispatch(actions.getCountAccounts())
    dispatch(actions.getCountInvoices())
    dispatch(actions.getTopSelling())
  }, [dispatch])

  return (
    <div className='dashboard'>
      <span className='title center'>DASHBOARD</span>
      {/* <RevenueChart invoices={invoices}/> */}

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
          <input type='date' className='input' value={selectedDate} onChange={handleSearch} />
        </div>
        <div className='table-bestseller'>
          <Chart />
          {/* <table className='w-full bg-[#a0a0a0]'>
            <thead>
              {shouldReload &&
                <tr>
                  <th>ID</th>
                  <th>IMAGE</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                </tr>
              }
              {!shouldReload &&
                <tr>
                  <th>ID</th>
                  <th>IMAGE</th>
                  <th>NAME</th>
                  <th>TOTALSOLD</th>
                  <th>PRICE</th>
                </tr>
              }
            </thead>
            <tbody>
              {shouldReload && filteredTop.length > 0 && filteredTop.map(item => {
                return (
                  <tr>
                    <td className='text-center'>{item?.product_invoicedetail.id}</td>
                    <td className='text-center w-[12%]'>
                      <img src={item?.product_invoicedetail.image} alt={item?.product_invoicedetail.name} className='w-[100%] object-cover' />
                    </td>
                    <td>{item?.product_invoicedetail.name}</td>
                    <td className='text-center'>{(item?.product_invoicedetail.price).toLocaleString()}</td>
                  </tr>
                )
              })}
              {!shouldReload && topselling?.length > 0 && topselling.map(item => {
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
          </table> */}
        </div>
        <div className='newinvoice'>
          <table className='w-full bg-[#a0a0a0]'>
            <thead>
              <tr>
                <th>ID BILL</th>
                <th>ID & Name</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {shouldReload && filteredInvoice.length > 0 && filteredInvoice.map(item => {
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
              {!shouldReload && invoices?.length > 0 && invoices.map(item => {
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