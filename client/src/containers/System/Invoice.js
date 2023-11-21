import React, { useEffect, useState } from 'react'
import { Button } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const Invoice = () => {
  const dispatch = useDispatch()
  const { invoicesall } = useSelector(state => state.invoice)
  const { currentData } = useSelector(state => state.user)
  const idcurrent = parseInt(currentData.id)
  const [selectedDate, setSelectedDate] = useState('');
  const [shouldReload, setShouldReload] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  
  const handleSearch = (event) => {
    setSelectedDate(event.target.value);
    setShouldReload(event.target.value !== "");
  };

  let filteredAccounts = [];
  if (invoicesall && Array.isArray(invoicesall)) {
    filteredAccounts = invoicesall.filter((item) =>
      item.createdAt.includes(selectedDate)
    );
  }

  const handleSubmitYes = async (id) => {
    const payload = {id: id, idAccept: idcurrent, state: 1}
    dispatch(actions.updateInvoices(payload))
    setShouldRefetch(true);
  }
  const handleSubmitNo = async (id) => {
    const payload = {id: id, idAccept: idcurrent, state: 2}
    dispatch(actions.updateInvoices(payload))
    setShouldRefetch(true);
  }

  useEffect(() => {
    dispatch(actions.getInvoices())
  }, [dispatch])

  useEffect(() => {
    if (shouldRefetch) {
      dispatch(actions.getInvoices())
      setShouldRefetch(false);
    }
  }, [dispatch, shouldRefetch])

  const mapInvoiceDetails = (items) => {
    return items.reduce((acc, item) => {
      const invoiceDetail = item?.invoice_detail;
      if (!invoiceDetail) return acc;

      const createdAtDate = new Date(invoiceDetail?.createdAt).toLocaleDateString();
      const stateString = invoiceDetail?.state === 1 ? 'Done' : invoiceDetail?.state === 0 ? 'Not yet' : 'Cancel';
      const stateColor = invoiceDetail?.state === 1 ? 'text-green-800' : 'text-red-500';

      if (!acc.some(accItem => accItem?.invoiceDetailId === invoiceDetail?.id)) {
        acc.push({
          invoiceDetailId: invoiceDetail?.id,
          jsx: (
            <tr className='cursor-pointer' onClick={() => setSelectedInvoiceId(invoiceDetail?.id)}>
              <td className='text-center'>{invoiceDetail?.id}</td>
              <td className='text-center'>{createdAtDate}</td>
              <td className='pl-1'>{invoiceDetail?.id} - {invoiceDetail?.account_invoice?.name}</td>
              <td className='text-center'>{(invoiceDetail?.total).toLocaleString()}</td>
              <td className='text-center'>{invoiceDetail?.idAccept}</td>
              <td className={`text-center ${stateColor}`}>{stateString}</td>
            </tr>
          )
        });
      }
      return acc;
    }, []).map(item => item.jsx);
  };

  return (
    <div className='invoice'>
      <span className='title'>INVOICE</span>
      <div className='invoice-accept-detail'>
        <div className='invoice-accept'>
          <table className='w-full'>
            <thead>
              <tr>
                <th>ID</th>
                <th>CREATED AT</th>
                <th>ID ACCOUNT</th>
                <th>TOTALITY</th>
                <th>REFUSE</th>
                <th>ACCEPT</th>
              </tr>
            </thead>
            <tbody>
              {invoicesall?.length > 0 && invoicesall.reduce((acc, item) => {
                const invoiceDetail = item?.invoice_detail;
                if (!invoiceDetail) return acc;
                const createdAtDate = new Date(invoiceDetail?.createdAt).toLocaleDateString();
                if (!acc.some(accItem => accItem?.invoiceDetailId === invoiceDetail?.id) && !invoiceDetail?.idAccept) {
                  acc.push({
                    invoiceDetailId: invoiceDetail?.id,
                    jsx: (
                      <tr className='cursor-pointer' onClick={() => setSelectedInvoiceId(invoiceDetail?.id)}>
                        <td className='text-center'>{invoiceDetail?.id}</td>
                        <td className='text-center'>{createdAtDate}</td>
                        <td className='text-center'>{invoiceDetail?.idAccount}</td>
                        <td className='text-center'>{(invoiceDetail?.total).toLocaleString()}</td>
                        <th>
                          <Button
                            text={'No'}
                            fullWidth
                            onClick={() => handleSubmitNo(invoiceDetail?.id)}
                          />
                        </th>
                        <th>
                          <Button
                            fullWidth
                            text={'Yes'}
                            onClick={() => handleSubmitYes(invoiceDetail?.id)}
                          />
                        </th>
                      </tr>
                    )
                  });
                }
                return acc;
              }, []).map(item => item.jsx)}
            </tbody>
          </table>
        </div>
        <div className='invoice-detail'>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='w-[8%]'>IDSP</th>
                <th className='w-[24%]'>NAME</th>
                <th className='w-[8%]'>QUANTITY</th>
                <th className='w-[25%]'>PRICE</th>
                <th className='w-[25%]'>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              {selectedInvoiceId && invoicesall?.length > 0 && invoicesall.map(item => {
                if (item.idInvoice === selectedInvoiceId) 
                  return (
                    <tr>
                      <td className='text-center'>{item.idProduct}</td>
                      <td className='pl-1'>{item.name}</td>
                      <td className='text-center'>{item.quantity}</td>
                      <td className='text-center'>{(item.price).toLocaleString()}</td>
                      <td className='text-center text-red-500'>{(item.quantity * item.price).toLocaleString()}</td>
                    </tr>
                  )
                return null
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className='invoice-all'>
        <div className='header-invoice'>
          <p className='title center'>ALL INVOICES</p>
          <input type='date' className='input bg-[#e7e7e7]' value={selectedDate} onChange={handleSearch} />
        </div>
        <div className='list-table h-64'>
          <table className='w-full'>
            <thead>
              <tr>
                <th>ID</th>
                <th>CREATED AT</th>
                <th>ID & NAME</th>
                <th>TOTALITY</th>
                <th>ID CONFIRM</th>
                <th>STATE</th>
              </tr>
            </thead>
            <tbody>
              {shouldReload && filteredAccounts.length > 0 && mapInvoiceDetails(filteredAccounts)}
              {!shouldReload && invoicesall?.length > 0 && mapInvoiceDetails(invoicesall)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Invoice