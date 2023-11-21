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
  const [shouldRefetch, setShouldRefetch] = useState(false);

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
  const handleReload = async () => {
    setPayload({ id: '' || null, idCategory: '', name: '', state: '' });
    setShouldRefetch(true);
  }
  const handleSubmitCreate = async () => {
    let finalPayload = payload;
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.createSamples(payload))
      setPayload({ id: '', idCategory: '', name: '', state: '' })
      setShouldRefetch(true);
    }
  }
  const handleSubmitUpdate = async () => {
    dispatch(actions.updateSamples(payload))
    setPayload({ id: '', idCategory: '', name: '', state: '' })
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
    if (shouldRefetch) {
      dispatch(actions.getLimitSamples(searchParamsObject))
      dispatch(actions.getFunctions(searchParamsObject))
      dispatch(actions.getPermissions())
      dispatch(actions.getCategories())
      dispatch(actions.getSamples())
      setShouldRefetch(false);
    } else {
      dispatch(actions.getLimitSamples(searchParamsObject))
      dispatch(actions.getFunctions(searchParamsObject))
      dispatch(actions.getPermissions())
      dispatch(actions.getCategories())
      dispatch(actions.getSamples())
    }
  }, [searchParmas, permis, dispatch, shouldRefetch])

  const renderSampleRow = (item) => {
    const handleClickRow = () => {
      setPayload({ ...payload, id: item.id, idCategory: item.idCategory, name: item.name, state: item.state })
    };

    return (
      <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
        <td className={styletd}>{item.id}</td>
        <td className={styletd}>{item.idCategory}</td>
        <td className='px-4 py-2'>{item.name}</td>
        <td className={styletd}>{item.state}</td>
      </tr>
    );
  };

  return (
    <div className='sample'>
      <div className='header-sample'>
        <span className='title center cursor-pointer' onClick={handleReload}>SAMPLE</span>
        <input
          className='text-[#000] outline-none bg-[#e7e7e7] p-2 rounded-md w-full '
          type="text"
          placeholder='Search by name'
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      {functions?.length > 0 && functions.map(item => item.name === 'Create' && item.idPermission === 1 && (
        <div className='form-create'>
          <div>
            <label className='text-xs mt-4'>ID CATEGORY</label>
            <select value={payload.idCategory}
              onChange={(e) => setPayload({ ...payload, idCategory: e.target.value })}
              className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 rounded-md w-full '>
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
          <div>
            <label className='text-xs mt-4'>STATE</label>
            <select value={payload.state}
              onChange={(e) => setPayload({ ...payload, state: e.target.value })}
              className='text-[#000] outline-none h-[46px] bg-[#e7e7e7] p-2 rounded-md w-full '>
              <option value="">Select STATE</option>
              <option value={1}>1 - Active</option>
              <option value={0}>0 - No Active</option>
            </select>
          </div>
          {payload.id ? (
            <Button
              class='col-span-2'
              text={'UPDATE'}
              value={payload.id}
              setValue={setPayload}
              onClick={handleSubmitUpdate}
            />
          ) : (
            <Button
              class='col-span-2'
              text={'CREATE'}
              onClick={handleSubmitCreate}
            />
          )}
        </div>
      ))}
      <div className='list-table'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-lg'>ID</th>
              <th className='text-lg'>ID CATEGORY</th>
              <th className='text-lg'>NAME</th>
              <th className='text-lg'>STATE</th>
            </tr>
          </thead>
          <tbody>
            {shouldReload && filteredSamples.length > 0 && filteredSamples.map((item) => renderSampleRow(item))}
            {!shouldReload && limitsamples?.length > 0 && limitsamples.map((item) => renderSampleRow(item))}
          </tbody>
        </table>
      </div>
      <Pagination count={count} currentPage={currentPage}
        setCurrentPage={setCurrentPage} counts={limitsamples}
      />
    </div>
  )
}

export default Sample