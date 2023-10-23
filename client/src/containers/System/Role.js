import React, { useEffect, useState } from 'react'
import { InputForm, Button } from '../../components/index'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import Swal from 'sweetalert2';

const stylep = 'font-semibold px-5 tracking-wider text-xl'

const Role = () => {
  const dispatch = useDispatch()
  const { menus } = useSelector(state => state.menu)
  const { transfers } = useSelector(state => state.transfer)
  const { allfunctions, msg, update } = useSelector(state => state.function)
  const { permissions } = useSelector(state => state.permission)
  const [invalidFields, setInvalidFields] = useState([])
  const [shouldRefetch, setShouldRefetch] = useState(false);

  //MENU
  const [payloadm, setPayloadm] = useState({
    id: '' || null, url: '', name: '', idPermission: '',
  });
  const handleSubmitMenu = async () => {
    let finalPayload = payloadm;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.createMenus(payloadm))
      setPayloadm({ url: '', name: '', idPermission: '' });
      setShouldRefetch(true);
    }
  }
  const handleSubmitUpdateMenu = async () => {
    let finalPayload = payloadm;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.updateMenus(payloadm))
      setPayloadm({ id: '', url: '', name: '', idPermission: '' });
      setShouldRefetch(true);
    }
  }
  const handleSubmitDeleteMenu = async () => {
    dispatch(actions.deleteMenus(payloadm))
    setPayloadm({ id: '', url: '', name: '', idPermission: '' });
    setShouldRefetch(true);
  }

  //FUNCTION
  const [payloadf, setPayloadf] = useState({
    id: '' || null, name: '', idPermission: '',
  });
  const handleSubmitFunction = async () => {
    let finalPayload = payloadf;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.createFunction(payloadf))
      setPayloadf({ name: '', idPermission: '' });
      setShouldRefetch(true);
    }
  }
  const handleSubmitUpdateFunction = async () => {
    let finalPayload = payloadf;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.updateFunctions(payloadf))
      setPayloadf({ id: '', name: '', idPermission: '' });
      setShouldRefetch(true);
    }
  }
  const handleSubmitDeleteFunction = async () => {
    dispatch(actions.deleteFunctions(payloadf))
    setPayloadf({ id: '', name: '', idPermission: '' });
    setShouldRefetch(true);
  }

  //TRANSFER
  const [payloadt, setPayloadt] = useState({
    id: '' || null, name: '', idPermission: '',
  });
  const handleSubmitTransfer = async () => {
    let finalPayload = payloadt;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.createTransfers(payloadt))
      setPayloadt({ name: '', idPermission: '' });
      setShouldRefetch(true);
    }
  }
  const handleSubmitUpdateTransfer = async () => {
    let finalPayload = payloadt;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.updateTransfers(payloadt))
      setPayloadt({ id: '', name: '', idPermission: '' });
      setShouldRefetch(true);
    }
  }
  const handleSubmitDeleteTransfer = async () => {
    dispatch(actions.deleteTransfers(payloadt))
    setPayloadt({ id: '', name: '', idPermission: '' });
    setShouldRefetch(true);
  }

  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);

    fields.forEach(item => {
      if (item[1] === '') {
        setInvalidFields(prev => [...prev, { name: item[0], msg: 'Bạn không được bỏ trống trường này!' }])
        invalids++;
        return;
      } else if (item[1] !== '')
        switch (item[0]) {
          case 'idPermission': {
            if (+item[1] !== 1 && +item[1] !== 2 && +item[1] !== 3) {
              setInvalidFields(prev => [...prev, { name: item[0], msg: 'Mã quyền không hợp lệ!' }]);
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
    msg && Swal.fire('Oops !', msg, 'error');
  }, [msg, update]);

  useEffect(() => {
    dispatch(actions.getMenus())
    dispatch(actions.getTransfers())
    dispatch(actions.getAllsFunctions())
    dispatch(actions.getPermissions())
  }, [dispatch])

  useEffect(() => {
    if (shouldRefetch) {
      dispatch(actions.getMenus());
      dispatch(actions.getTransfers());
      dispatch(actions.getAllsFunctions());
      dispatch(actions.getPermissions());
      setShouldRefetch(false);
    }
  }, [dispatch, shouldRefetch]);

  return (
    <div className='role'>
      <span className='title center'>ROLE</span>
      <div className='form-frame'>
        <div className='list-table h-48'>
          <table className='w-full'>
            <thead>
              <tr>
                <th>ID</th>
                <th>URL</th>
                <th>NAME</th>
                <th>ID PERMISSION</th>
              </tr>
            </thead>
            <tbody>
              {menus?.length > 0 && menus.map(item => {
                const handleClickRow = () => {
                  setPayloadm({
                    ...payloadm, id: item.id, url: item.url,
                    name: item.name, idPermission: item.idPermission
                  });
                };
                return (
                  <tr onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                    <td className='text-center'>{item.id}</td>
                    <td className='px-4'>{item.url}</td>
                    <td className='px-4'>{item.name}</td>
                    <td className='text-center'>{item.idPermission}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className='form'>
          <div className='formheader-btn'>
            <p className={stylep}>MENU</p>
            <div className='btn'>
              <Button
                text='DELETE'
                bgColor='bg-cancel'
                textColor='text-white'
                value={payloadm.id}
                setValue={setPayloadm}
                className='py-5'
                onClick={handleSubmitDeleteMenu}
              />
              <Button
                text='UPDATE'
                bgColor='bg-green-800'
                textColor='text-white'
                value={payloadm.id}
                setValue={setPayloadm}
                className='py-5'
                onClick={handleSubmitUpdateMenu}
              />
              <Button
                text='CREATE'
                bgColor='bg-secondary2'
                textColor='text-white'
                className='py-5'
                onClick={handleSubmitMenu}
              />
            </div>
          </div>
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'URL'}
            value={payloadm.url}
            setValue={setPayloadm}
            keyPayload={'url'}
            type='text'
          />
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'Name'}
            value={payloadm.name}
            setValue={setPayloadm}
            keyPayload={'name'}
            type='text'
          />
          <div className='dropselect'>
            <label className='text-xs mt-4'>ID PERMISSION</label>
            <select value={payloadm.idPermission}
              onChange={(e) => setPayloadm({ ...payloadm, idPermission: e.target.value })}
              className='outline-none bg-[#cacaca] p-2 rounded-md w-full ' >
              <option value="">Select ID Permission</option>
              {permissions?.length > 0 && permissions.map(item => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className='form-frame'>
        <div className='list-table h-40'>
          <table className='w-full '>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>ID PERMISSION</th>
              </tr>
            </thead>
            <tbody>
              {allfunctions?.length > 0 && allfunctions.map(item => {
                const handleClickRow = () => {
                  setPayloadf({
                    ...payloadf, id: item.id, name: item.name,
                    idPermission: item.idPermission
                  });
                };
                return (
                  <tr onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                    <td className='text-center'>{item.id}</td>
                    <td className='px-4'>{item.name}</td>
                    <td className='text-center'>{item.idPermission}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className='form'>
          <div className='formheader-btn'>
            <p className={stylep}>FUNCTION</p>
            <div className='btn'>
              <Button
                text='DELETE'
                bgColor='bg-cancel'
                textColor='text-white'
                value={payloadf.id}
                setValue={setPayloadf}
                className='py-5'
                onClick={handleSubmitDeleteFunction}
              />
              <Button
                text='UPDATE'
                bgColor='bg-green-800'
                textColor='text-white'
                value={payloadf.id}
                setValue={setPayloadf}
                className='py-5'
                onClick={handleSubmitUpdateFunction}
              />
              <Button
                text='CREATE'
                bgColor='bg-secondary2'
                textColor='text-white'
                fullWidth
                onClick={handleSubmitFunction}
              />
            </div>
          </div>
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'NAME'}
            value={payloadf.name}
            setValue={setPayloadf}
            keyPayload={'name'}
            type='text'
          />
          <div className='dropselect'>
            <label className='text-xs mt-4'>ID PERMISSION</label>
            <select value={payloadf.idPermission}
              onChange={(e) => setPayloadf({ ...payloadf, idPermission: e.target.value })}
              className='outline-none bg-[#cacaca] p-2 rounded-md w-full ' >
              <option value="">Select ID Permission</option>
              {permissions?.length > 0 && permissions.filter(item => item.id === 1 || item.id === 2).map(item => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className='h-8'></div>
        </div>
      </div>

      <div className='form-frame'>
        <div className='list-table h-40'>
          <table className='w-full'>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>ID PERMISSION</th>
              </tr>
            </thead>
            <tbody>
              {transfers?.length > 0 && transfers.map(item => {
                const handleClickRow = () => {
                  setPayloadt({
                    ...payloadt, id: item.id, name: item.name,
                    idPermission: item.idPermission
                  });
                };
                return (
                  <tr onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                    <td className='text-center'>{item.id}</td>
                    <td className='px-4'>{item.name}</td>
                    <td className='text-center'>{item.idPermission}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className='form'>
          <div className='formheader-btn'>
            <p className={stylep}>Transfer</p>
            <div className='btn'>
              <Button
                text='DELETE'
                bgColor='bg-cancel'
                textColor='text-white'
                value={payloadt.id}
                setValue={setPayloadt}
                className='py-5'
                onClick={handleSubmitDeleteTransfer}
              />
              <Button
                text='UPDATE'
                bgColor='bg-green-800'
                textColor='text-white'
                value={payloadt.id}
                setValue={setPayloadt}
                className='py-5'
                onClick={handleSubmitUpdateTransfer}
              />
              <Button
                text='CREATE'
                bgColor='bg-secondary2'
                textColor='text-white'
                onClick={handleSubmitTransfer}
              />
            </div>
          </div>
          <InputForm
            setInvalidFields={setInvalidFields}
            invalidFields={invalidFields}
            label={'NAME'}
            value={payloadt.name}
            setValue={setPayloadt}
            keyPayload={'name'}
            type='text'
          />
          <div className='dropselect'>
            <label className='text-xs mt-4'>ID PERMISSION</label>
            <select value={payloadt.idPermission}
              onChange={(e) => setPayloadt({ ...payloadt, idPermission: e.target.value })}
              className='outline-none bg-[#cacaca] p-2 rounded-md w-full ' >
              <option value="">Select ID Permission</option>
              {permissions?.length > 0 && permissions.filter(item => item.id === 1 || item.id === 2).map(item => (
                <option value={item.id}>{item.name}</option>
              ))}
            </select>
          </div>
          <div className='h-8'></div>
        </div>
      </div>
    </div>
  )
}

export default Role