import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { useSearchParams } from 'react-router-dom'
import { InputForm, Button } from '../../components/index'
import Swal from 'sweetalert2';
import { Pagination } from './index';

const styletd = 'text-center text-base px-4 py-2 text-base'

const Account = () => {
  const dispatch = useDispatch()
  const [searchParmas] = useSearchParams()
  const { msg, update } = useSelector(state => state.auth)
  const { counta, accounts } = useSelector(state => state.account)
  const { functions } = useSelector(state => state.function)
  const { currentData } = useSelector(state => state.user)
  const permis = currentData.idPermission
  const [invalidFields, setInvalidFields] = useState([])
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let page = searchParmas.get('page');
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [searchParmas, accounts, currentPage]);

  const [payload, setPayload] = useState({
    id: '' || null,
    name: '',
    email: '',
    phone: '',
    password: '',
    idPermission: '2',
    state: '1'
  });
  const handleSubmitCreate = async () => {
    let finalPayload = payload;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.register(payload))
      window.location.reload();
    }
  }

  const [payloadu, setPayloadu] = useState({
    id: '',
    name: '',
    state: ''
  })
  const handleSubmitUpdate = async () => {
    dispatch(actions.updateStateAccount(payloadu))  
    window.location.reload();
  }

  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);

    fields.forEach(item => {
      if (item[1] === '') {
        setInvalidFields(prev => [...prev, {
          name: item[0],
          msg: 'You must not leave this input blank!'
        }])
        invalids++;
        return;
      } else if (item[1] !== '') {
        switch (item[0]) {
          case 'password': {
            if (item[1].length < 4) {
              setInvalidFields(prev => [...prev, {
                name: item[0],
                msg: 'Password at least 4 characters!'
              }])
              invalids++;
            }
            break;
          }
          case 'phone': {
            if (!+item[1]) {
              setInvalidFields(prev => [...prev, {
                name: item[0],
                msg: 'Invalid phone number!'
              }])
              invalids++;
            }
            break;
          }
          case 'email': {
            if (!/\S+@\S+\.\S+/.test(item[1])) {
              setInvalidFields(prev => [...prev, {
                name: item[0],
                msg: 'Invalid email!'
              }])
              invalids++;
            }
            break;
          }
          case 'idPermission': {
            if (+item[1] !== 2 && +item[1] !== 3) {
              setInvalidFields(prev => [...prev, {
                name: item[0],
                msg: 'Invalid permission code!'
              }]);
              invalids++;
            }
            break;
          }
          default:
            break;
        }
      }
    })
    return invalids;
  }

  useEffect(() => {
    msg && Swal.fire('Oops !', msg, 'error');
  }, [msg, update]);

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
    dispatch(actions.getAccounts(searchParamsObject))
    dispatch(actions.getFunctions(searchParamsObject))
    dispatch(actions.getPermissions())
  }, [searchParmas, permis, dispatch])

  return (
    <div className='w-full p-2 my-10'>
      <span className='text-4xl font-bold tracking-widest justify-center items-center'>ACCOUNT</span>
      <div className='mt-5'>
        {functions?.length > 0 && functions.map(item => item.name === 'Create' && item.idPermission === 1 && (
          <div className='w-full grid grid-cols-4 gap-2'>
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
                invalidFields={invalidFields} label={'PHONE'}
                value={payload.phone}
                setValue={setPayload}
                keyPayload={'phone'}
                type='tel'
              />
            }
            {!payload.id &&
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'PASSWORD'}
                value={payload.password}
                setValue={setPayload}
                keyPayload={'password'}
                type='password'
              />
            }
            {!payload.id &&
              <div className='col-span-3'></div>
            }
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
            <th className='text-lg'>CREATED AT</th>
            <th className='text-lg'>NAME</th>
            <th className='text-lg'>EMAIL</th>
            <th className='text-lg'>PHONE</th>
            <th className='text-lg'>PERMISSION</th>
            <th className='text-lg'>STATE</th>
          </tr>
          {accounts?.length > 0 && accounts.map(item => {
            const handleClickRow = () => {
              setPayload({ ...payload, id: item.id })
              setPayloadu({
                ...payloadu, id: item.id, name: item.name, state: item.state,
              });
            };
            return (
              <tr key={accounts.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                <td className={styletd}>{item.id}</td>
                <td className={styletd}>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td className='px-4 py-2'>{item.name}</td>
                <td className='px-4 py-2'>{item.email}</td>
                <td className={styletd}>{item.phone}</td>
                <td className={styletd}>{item.idPermission}</td>
                <td className={styletd}>{item.state}</td>
              </tr>
            )
          })}
        </table>
      </div>
      <Pagination
        count={counta}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        counts={accounts}
      />
    </div>
  )
}

export default Account