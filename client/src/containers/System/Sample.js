import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components/index'
import { Pagination } from './index'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'

const styletd = 'text-center text-base px-4 py-2 text-base'

const Sample = () => {
  const dispatch = useDispatch()
  const [searchParmas] = useSearchParams()
  const { count, samples, limitsamples } = useSelector(state => state.app)
  const { functions } = useSelector(state => state.function)
  const { currentData } = useSelector(state => state.user)
  const { categories } = useSelector(state => state.app)
  const permis = currentData.idPermission
  const [currentPage, setCurrentPage] = useState(1);
  const [invalidFields, setInvalidFields] = useState([])
  const [searchValue, setSearchValue] = useState("");
  const [shouldReload, setShouldReload] = useState(false);

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
    setShouldReload(event.target.value !== "");
  };

  let filteredSamples = [];
  if (samples && Array.isArray(samples)) {
    filteredSamples = samples.filter((item) =>
      item.name.includes(searchValue)
    );
  }

  const [payload, setPayload] = useState({
    id: '' || null, idCategory: '', name: '', state: ''
  });
  const handleSubmitCreate = async () => {
    let finalPayload = payload;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.createSamples(payload))
      window.location.reload();
    }
  }
  const handleSubmitUpdate = async () => {
    dispatch(actions.updateSamples(payload))
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
      }
    })
    return invalids;
  }

  useEffect(() => {
    let page = searchParmas.get('page');
    page && +page !== currentPage && setCurrentPage(+page);
    !page && setCurrentPage(1);
  }, [searchParmas, limitsamples, currentPage]);

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
    dispatch(actions.getLimitSamples(searchParamsObject))
    dispatch(actions.getFunctions(searchParamsObject))
    dispatch(actions.getPermissions())
    dispatch(actions.getCategories())
    dispatch(actions.getSamples())
  }, [searchParmas, permis, dispatch])

  return (
    <div className='w-full p-2 my-10'>
      <div className='grid grid-cols-4'>
        <span className='text-4xl font-bold col-span-3 tracking-widest justify-center items-center'>SAMPLE</span>
        <input
          className='outline-none bg-[#EEEEEE] p-2 rounded-md w-full '
          type="text"
          placeholder='Search by name'
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      <div className='mt-5'>
        {functions?.length > 0 && functions.map(item => item.name === 'Create' && item.idPermission === 1 && (
          <div className='w-full grid grid-cols-4 gap-2'>
            <div>
              <label className='text-xs mt-4'>ID CATEGORY</label>
              <select value={payload.idCategory}
                onChange={(e) => setPayload({ ...payload, idCategory: e.target.value })}
                className='outline-none bg-[#EEEEEE] p-2 rounded-md w-full '>
                <option value="">Select ID CATEGORY</option>
                {categories?.length > 0 && categories.map(item => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            </div>
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
              invalidFields={invalidFields} label={'STATE'}
              value={payload.state}
              setValue={setPayload}
              keyPayload={'state'}
              type='number'
            />
            {payload.id &&
              <Button
                class='col-span-2'
                text={'UPDATE'}
                value={payload.id}
                setValue={setPayload}
                bgColor='bg-green-800'
                textColor='text-white'
                onClick={handleSubmitUpdate}
              />
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
            <th className='text-lg'>ID CATEGORY</th>
            <th className='text-lg'>NAME</th>
            <th className='text-lg'>STATE</th>
          </tr>
          {shouldReload && filteredSamples.length > 0 && filteredSamples.map((item) => {
            const handleClickRow = () => {
              setPayload({ ...payload, id: item.id, idCategory: item.idCategory, name: item.name, state: item.state })
            }
            return (
              <tr key={samples.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                <td className={styletd}>{item.id}</td>
                <td className={styletd}>{item.idCategory}</td>
                <td className='px-4 py-2'>{item.name}</td>
                <td className={styletd}>{item.state}</td>
              </tr>
            )
          })}
          {!shouldReload && limitsamples?.length > 0 && limitsamples.map(item => {
            const handleClickRow = () => {
              setPayload({ ...payload, id: item.id, idCategory: item.idCategory, name: item.name, state: item.state })
            }
            return (
              <tr key={limitsamples.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                <td className={styletd}>{item.id}</td>
                <td className={styletd}>{item.idCategory}</td>
                <td className='px-4 py-2'>{item.name}</td>
                <td className={styletd}>{item.state}</td>
              </tr>
            )
          })}
        </table>
      </div>
      <Pagination count={count} currentPage={currentPage}
        setCurrentPage={setCurrentPage} counts={limitsamples}
      />
    </div>
  )
}

export default Sample