import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components/index'
import { Pagination } from './index'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const styletd = 'text-center text-base px-4 py-2 text-base'

const Provider = () => {
  const dispatch = useDispatch()
  const [searchParmas] = useSearchParams()

  const { count, providers } = useSelector(state => state.provider)
  const { functions } = useSelector(state => state.function)
  const { currentData } = useSelector(state => state.user)
  const permis = currentData.idPermission
  const [currentPage, setCurrentPage] = useState(1);
  const [invalidFields, setInvalidFields] = useState([])

  const [payload, setPayload] = useState({
    id: '' || null,
    name: '',
    email: '',
    phone: '',
    address: '',
    state: ''
  });
  const handleSubmitCreate = async () => {
    let finalPayload = payload;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.createProviders(payload))
      window.location.reload();
    }
  }

  const [payloadu, setPayloadu] = useState({
    id: '',
    name: '',
    state: ''
  })
  const handleSubmitUpdate = async () => {
    dispatch(actions.updateProviders(payloadu))
    window.location.reload();
  }

  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);

    fields.forEach(item => {
      if (item[1] === '') {
        setInvalidFields(prev => [...prev, {
          name: item[0],
          msg: 'Bạn không được bỏ trống trường này!'
        }])
        invalids++;
        return;
      } else if (item[1] !== '')
        switch (item[0]) {
          case 'phone': {
            if (!+item[1]) {
              setInvalidFields(prev => [...prev, {
                name: item[0],
                msg: 'Số điện thoại không hợp lệ!'
              }])
              invalids++;
            }
            break;
          }
          case 'email': {
            if (!/\S+@\S+\.\S+/.test(item[1])) {
              setInvalidFields(prev => [...prev, {
                name: item[0],
                msg: 'Email không hợp lệ!'
              }])
              invalids++;
            }
            break;
          }
          default:
            break;
        }
    })
    return invalids;
  }

  useEffect(() => {
    let page = searchParmas.get('page');
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [searchParmas, providers, currentPage]);

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
    dispatch(actions.getProviders(searchParamsObject))
    dispatch(actions.getFunctions(searchParamsObject))
    dispatch(actions.getPermissions())
  }, [searchParmas, permis, dispatch])

  return (
    <div className='w-full p-2 my-10'>
      <span className='text-4xl font-bold tracking-widest justify-center items-center'>PROVIDER</span>
      <div className='mt-5'>
        {functions?.length > 0 && functions.map(item => item.name === 'Create' && item.idPermission === 1 && (
          <div className='w-full grid grid-cols-4 gap-2'>
            {!payload.id &&
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'NAME'}
                value={payload.name}
                setValue={setPayload}
                keyPayload={'name'}
                type='text'
              />
            }
            {!payload.id &&
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields} label={'PHONE'}
                value={payload.phone}
                setValue={setPayload}
                keyPayload={'phone'}
                type='tel'
              />}
            {!payload.id &&
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'EMAIL'}
                value={payload.email}
                setValue={setPayload}
                keyPayload={'email'}
                type='email'
              />
            }
            {!payload.id &&
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'ADDRESS'}
                value={payload.address}
                setValue={setPayload}
                keyPayload={'address'}
                type='text'
              />
            }
            {!payload.id &&
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields} label={'STATE'}
                value={payload.state}
                setValue={setPayload}
                keyPayload={'state'}
                type='number'
              />
            }
            {payload.id &&
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'NAME'}
                value={payloadu.name}
                setValue={setPayloadu}
                keyPayload={'name'}
                type='text'
                disabled={true}
              />
            }
            {payload.id &&
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields} label={'STATE'}
                value={payloadu.state}
                setValue={setPayloadu}
                keyPayload={'state'}
                type='number'
              />
            }
            {payload.id && <div></div>}
            {payload.id &&
              <Button
                class='col-span-2'
                text={'UPDATE'}
                value={payloadu.id}
                setValue={setPayloadu}
                bgColor='bg-green-800'
                textColor='text-white'
                onClick={handleSubmitUpdate}
              />
            }
            {!payload.id && <div></div>}
            {!payload.id && <div></div>}
            {!payload.id &&
              <Button
                class='col-span-2'
                text={'CREATE'}
                bgColor='bg-secondary2'
                textColor='text-white'
                onClick={handleSubmitCreate}
              />
            }
          </div>
        ))}
      </div>
      <div className='mt-5'>
        <table className='w-full border-collapse border-2 '>
          <tr>
            <th className='text-lg'>ID</th>
            <th className='text-lg'>Name</th>
            <th className='text-lg'>Phone</th>
            <th className='text-lg'>email</th>
            <th className='text-lg'>Address</th>
            <th className='text-lg'>State</th>
          </tr>
          {providers?.length > 0 && providers.map(item => {
            const handleClickRow = () => {
              setPayload({ ...payload, id: item.id })
              setPayloadu({
                ...payloadu, id: item.id, name: item.name, state: item.state,
              });
            };
            return (
              <tr key={providers.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                <td className={styletd}>{item.id}</td>
                <td className='px-4 py-2'>{item.name}</td>
                <td className={styletd}>{item.phone}</td>
                <td className={styletd}>{item.email}</td>
                <td className={styletd}>{item.address}</td>
                <td className={styletd}>{item.state}</td>
              </tr>
            )
          })}
        </table>
      </div>
      <Pagination
        count={count}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        counts={providers}
      />
    </div>
  )
}

export default Provider