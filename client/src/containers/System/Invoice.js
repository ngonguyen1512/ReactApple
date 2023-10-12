import React, { useEffect, useState } from 'react'
import { Button } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const Invoice = () => {
  const dispatch = useDispatch()
  const { invoicesall } = useSelector(state => state.invoice)
  const { currentData } = useSelector(state => state.user)
  const idcurrent = parseInt(currentData.id)
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  const handleSubmitYes = async (id) => {
    const payload = {
      id: id,
      idAccept: idcurrent,
      state: 1
    }
    dispatch(actions.updateInvoices(payload))
    // window.location.reload();
  }
  const handleSubmitNo = async (id) => {
    const payload = {
      id: id,
      idAccept: idcurrent,
      state: 2
    }
    dispatch(actions.updateInvoices(payload))
    // window.location.reload();
  }

  useEffect(() => {
    dispatch(actions.getInvoices())
  })

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
            {invoicesall?.length > 0 && invoicesall.reduce((acc, item) => {
              const createdAtDate = new Date(item?.invoice_detail.createdAt).toLocaleDateString();
              if (!acc.includes(item?.invoice_detail.id) && !item?.invoice_detail.idAccept) {
                acc.push(item?.invoice_detail.id);
                return [
                  ...acc,
                  <tr className='cursor-pointer' onClick={() => setSelectedInvoiceId(item?.invoice_detail.id)}>
                    <td className='text-center'>{item?.invoice_detail.id}</td>
                    <td className='text-center'>{createdAtDate}</td>
                    <td className='pl-1'>{item?.invoice_detail.idAccount}</td>
                    <td className='text-center'>{(item?.invoice_detail.total).toLocaleString()}</td>
                    <th>
                      <Button
                        class='col-span-2'
                        text={'No'}
                        bgColor='bg-red-500'
                        textColor='text-white'
                        onClick={() => handleSubmitNo(item?.invoice_detail.id)}
                      />
                    </th>
                    <th>
                      <Button
                        class='col-span-2'
                        text={'Yes'}
                        bgColor='bg-secondary2'
                        textColor='text-white'
                        onClick={() => handleSubmitYes(item?.invoice_detail.id)}
                      />
                    </th>
                  </tr>
                ];
              }
              return acc;

            }, [])}
          </table>
        </div>
        <div className='w-full h-52 overflow-auto border rounded-sm '>
          <table className='w-full'>
            <tr>
              <th className='w-[8%]'>IDSP</th>
              <th className='w-[24%]'>Name</th>
              <th className='w-[8%]'>Quantity</th>
              <th className='w-[25%]'>Price</th>
              <th className='w-[25%]'>Total</th>
            </tr>
            {selectedInvoiceId && invoicesall?.length > 0 && invoicesall.map(item => {
              if (item.idInvoice === selectedInvoiceId) {
                return (
                  <tr>
                    <td className='text-center'>{item.idProduct}</td>
                    <td className='pl-1'>{item.name}</td>
                    <td className='text-center'>{item.quantity}</td>
                    <td className='text-center'>{item.price}</td>
                    <td className='text-center text-red-500'>{item.quantity * item.price}</td>
                  </tr>
                )
              }
              return null
            })}
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
            {invoicesall?.length > 0 && invoicesall.reduce((acc, item) => {
              const createdAtDate = new Date(item?.invoice_detail.createdAt).toLocaleDateString();
              const stateString = item?.invoice_detail.state === 1 ? 'Done' : item?.invoice_detail.state === 0 ? 'Not yet' : 'Cancel';
              const stateColor = item?.invoice_detail.state === 1 ? 'text-green-800' : 'text-red-500';
              if (!acc.includes(item?.invoice_detail.id)) {
                acc.push(item?.invoice_detail.id);
                return [
                  ...acc,
                  <tr className='cursor-pointer' onClick={() => setSelectedInvoiceId(item?.invoice_detail.id)}>
                    <td className='text-center'>{item?.invoice_detail.id}</td>
                    <td className='text-center'>{createdAtDate}</td>
                    <td>{item?.invoice_detail.idAccount}</td>
                    <td className='text-center'>{item?.invoice_detail.total}</td>
                    <td className='text-center'>{item?.invoice_detail.idAccept}</td>
                    <td className={`text-center ${stateColor}`}>{stateString}</td>
                  </tr>
                ];
              }
              return acc;
            }, [])}
          </table>
        </div>
      </div>
    </div>
  )
}

export default Invoice