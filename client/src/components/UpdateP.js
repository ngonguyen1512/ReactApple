import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../store/actions'
import { InputForm, Button } from './index'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import { path } from '../utils/constant'

const UpdateP = ({ id, name, quantity, price, discount, idProvider, state }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const { msg, update } = useSelector(state => state.product)
  const [invalidFields, setInvalidFields] = useState([])

  const [payload, setPayload] = useState({
    id: id, name: name, quantity: quantity,
    price: price, discount: discount,
    idProvider: idProvider, state: state
  });
  const handleSubmitUpdate = async () => {
    let finalPayload = payload;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.updateProducts(payload))
      navigate('/webserver/' + path.PRODUCT)
    }
  }

  const validate = (payload) => {
    let invalids = 0;
    let fields = Object.entries(payload);

    fields.forEach(item => {
      if (item[1] === '') {
        setInvalidFields(prev => [...prev, { name: item[0], msg: 'Bạn không được bỏ trống trường này!' }])
        invalids++;
        return;
      }
    })
    return invalids;
  }

  useEffect(() => {
    msg && Swal.fire('Oops !', msg, 'error');
  }, [msg, update]);

  return (
    <div className='w-full grid grid-cols-3 gap-2'>
      <InputForm
        setInvalidFields={setInvalidFields}
        invalidFields={invalidFields}
        label={'ID PROVIDER'}
        value={payload.idProvider}
        setValue={setPayload}
        keyPayload={'idProvider'}
        type='text'
        disabled={true}
      />
      <InputForm
        setInvalidFields={setInvalidFields}
        invalidFields={invalidFields}
        label={'PRODUCT NAME'}
        value={payload.name}
        setValue={setPayload}
        keyPayload={'name'}
        type='text'
      />
      <InputForm
        setInvalidFields={setInvalidFields}
        invalidFields={invalidFields}
        label={'QUANTITY'}
        value={payload.quantity}
        setValue={setPayload}
        keyPayload={'quantity'}
        type='number'
        disabled={true}
      />
      <InputForm
        setInvalidFields={setInvalidFields}
        invalidFields={invalidFields}
        label={'PRICE'}
        value={payload.price}
        setValue={setPayload}
        keyPayload={'price'}
        type='number'
      />
      <InputForm
        setInvalidFields={setInvalidFields}
        invalidFields={invalidFields}
        label={'DISCOUNT'}
        value={payload.discount}
        setValue={setPayload}
        keyPayload={'discount'}
        type='number'
      />
      <InputForm
        setInvalidFields={setInvalidFields}
        invalidFields={invalidFields}
        label={'STATE'}
        value={payload.state}
        setValue={setPayload}
        keyPayload={'state'}
        type='number'
      />
      <Button
        class='col-span-2'
        text={'Save'}
        value={payload.id}
        setValue={setPayload}
        bgColor='bg-secondary2'
        textColor='text-white'
        onClick={handleSubmitUpdate}
      />
    </div>
  )
}

export default UpdateP