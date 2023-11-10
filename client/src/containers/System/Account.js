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
  const [searchValue, setSearchValue] = useState("");
  const [shouldReload, setShouldReload] = useState(false);
  const [shouldRefetch, setShouldRefetch] = useState(false);

  useEffect(() => {
    let page = searchParmas.get('page');
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [searchParmas, accounts, currentPage]);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setShouldReload(event.target.value !== "");
  };

  let filteredAccounts = [];
  if (accounts && Array.isArray(accounts)) {
    filteredAccounts = accounts.filter((item) =>
      item.name.includes(searchValue)
    );
  }

  const [payload, setPayload] = useState({
    id: '' || null, name: '', email: '', phone: '',
    password: '', idPermission: '2', state: '1'
  });
  const handleReload = async () => {
    setPayload({ id: '' || null, name: '', state: '' });
    setShouldRefetch(true);
  }
  const handleSubmitCreate = async () => {
    let finalPayload = payload;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.register(payload))
      setShouldRefetch(true);
    }
  }

  const [payloadu, setPayloadu] = useState({
    id: '', name: '', state: ''
  })
  const handleSubmitUpdate = async () => {
    dispatch(actions.updateStateAccount(payloadu))
    setShouldRefetch(true);
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
      if (Object.keys(searchParamsObject)?.some(item => item === i[0]))
        searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
      else
        searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
    })
    if (permis) searchParamsObject.permis = permis
    dispatch(actions.getAccounts(searchParamsObject))
    dispatch(actions.getFunctions(searchParamsObject))
    dispatch(actions.getPermissions())
  }, [searchParmas, permis, dispatch])

  useEffect(() => {
    if (shouldRefetch) {
      let params = [];
      for (let entry of searchParmas.entries()) params.push(entry);
      let searchParamsObject = {}
      params?.forEach(i => {
        if (Object.keys(searchParamsObject)?.some(item => item === i[0]))
          searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
        else
          searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
      })
      if (permis) searchParamsObject.permis = permis
      dispatch(actions.getAccounts(searchParamsObject))
      dispatch(actions.getFunctions(searchParamsObject))
      dispatch(actions.getPermissions())
      setShouldRefetch(false);
    }
  }, [searchParmas, permis, dispatch, shouldRefetch])

  const renderTableRow = (item) => {
    const handleClickRow = () => {
      setPayload({ ...payload, id: item.id });
      setPayloadu({
        ...payloadu, id: item.id,
        name: item.name, state: item.state,
      });
    };

    return (
      <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
        <td className={styletd}>{item.id}</td>
        <td className={styletd}>{new Date(item.createdAt).toLocaleDateString()}</td>
        <td className='px-4 py-2'>{item.name}</td>
        <td className='px-4 py-2'>{item.email}</td>
        <td className={styletd}>{item.phone}</td>
        <td className={styletd}>{item.idPermission}</td>
        <td className={styletd}>{item.state}</td>
      </tr>
    );
  };

  return (
    <div className='account'>
      <div className='header-account'>
        <span className='title center cursor-pointer' onClick={handleReload}>ACCOUNT</span>
        <input
          className='outline-none bg-[#e7e7e7] p-2 rounded-md w-full text-[#000]'
          type="text"
          placeholder='Search by name'
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      {functions?.length > 0 && functions.map(item => item.name === 'Create' && item.idPermission === 1 && (
        <div className='form-create'>
          {payload.id && (
            <>
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
              <div>
                <label className='text-xs mt-4'>STATE</label>
                <select value={payloadu.state}
                  onChange={(e) => setPayloadu({ ...payloadu, state: e.target.value })}
                  className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 rounded-md w-full '>
                  <option value="">Select STATE</option>
                  <option value={1}>1 - Active</option>
                  <option value={0}>0 - No Active</option>
                </select>
              </div>
              <Button
                class='col-span-2'
                text={'UPDATE'}
                value={payloadu.id}
                setValue={setPayloadu}
                // bgColor='bg-green-800'
                // textColor='text-white'
                onClick={handleSubmitUpdate}
              />
            </>
          )}
          {!payload.id && (
            <>
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'NAME'}
                value={payload.name}
                setValue={setPayload}
                keyPayload={'name'}
                type='text'
              />
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'EMAIL'}
                value={payload.email}
                setValue={setPayload}
                keyPayload={'email'}
                type='email'
              />
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'PHONE'}
                value={payload.phone}
                setValue={setPayload}
                keyPayload={'phone'}
                type='tel'
              />
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'PASSWORD'}
                value={payload.password}
                setValue={setPayload}
                keyPayload={'password'}
                type='password'
              />
              <div className='col-span-3'></div>
              <Button
                class='col-span-2'
                text={'CREATE'}
                // bgColor='bg-secondary2'
                // textColor='text-white'
                onClick={handleSubmitCreate}
              />
            </>
          )}
        </div>
      ))}
      <div className='list-table'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-lg'>ID</th>
              <th className='text-lg'>CREATED AT</th>
              <th className='text-lg'>NAME</th>
              <th className='text-lg'>EMAIL</th>
              <th className='text-lg'>PHONE</th>
              <th className='text-lg'>PERMISSION</th>
              <th className='text-lg'>STATE</th>
            </tr>
          </thead>
          <tbody>
            {shouldReload && filteredAccounts.length > 0 && filteredAccounts.map((item) => renderTableRow(item))}
            {!shouldReload && Array.isArray(accounts) && accounts?.length > 0 && accounts.map((item) => renderTableRow(item))}
          </tbody>
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