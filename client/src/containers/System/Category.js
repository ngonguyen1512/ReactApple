import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components/index'
import { Pagination } from './index'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';

const styletd = 'text-center text-base px-4 py-2 text-base'

const Category = () => {
  const dispatch = useDispatch()
  const [searchParmas] = useSearchParams()
  const { count, categories, limitcategories } = useSelector(state => state.app)
  const { functions } = useSelector(state => state.function)
  const { currentData } = useSelector(state => state.user)
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

  let filteredCategories = [];
  if (categories && Array.isArray(categories)) {
    filteredCategories = categories.filter((item) =>
      item.name.includes(searchValue)
    );
  }

  const [payload, setPayload] = useState({
    id: '' || null, name: '', image: '', state: ''
  });
  const handleReloadu = async () => {
    setPayload({ id: '', name: '', image: '', state: '' });
    setShouldRefetch(true);
  }
  const extractFileName = (path) => {
    const fileName = path.split('\\').pop();
    return fileName !== undefined ? fileName : '';
  };
  const uploadFileAndDispatch = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return axios.post('http://localhost:5000/api/v1/image/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  };
  const handleSubmitCreate = async () => {
    let finalPayload = { ...payload };
    finalPayload.image = extractFileName(payload.image);
    let fileInput = document.querySelector('input[type="file"]');
    let file = fileInput.files[0];
    let invalids = validate(finalPayload);
    if (invalids === 0) {
      dispatch(actions.createCategories(payload)).then(() => {
        uploadFileAndDispatch(file)
          .then(response => {
            console.log('File uploaded to server:', response.data);
          }).catch(error => {
            console.error('Error uploading file:', error);
          });
      }).catch(error => { console.error('Error dispatching action:', error); });
      setShouldRefetch(true);
    }
  }
  const handleSubmitUpdate = async () => {
    dispatch(actions.updateCategories(payload))
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
  }, [searchParmas, limitcategories, currentPage]);

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
    dispatch(actions.getLimitCategories(searchParamsObject))
    dispatch(actions.getFunctions(searchParamsObject))
    dispatch(actions.getPermissions())
    dispatch(actions.getCategories())
  }, [searchParmas, permis, dispatch])

  useEffect(() => {
    if (shouldRefetch) {
      dispatch(actions.getCategories())
      setShouldRefetch(false);
    }
  }, [dispatch, shouldRefetch])

  const mapRows = (data) => {
    return data.map((item) => {
      const handleClickRow = () => {
        setPayload({ ...payload, id: item.id, name: item.name, image: item.image, state: item.state });
      };
      return (
        <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
          <td className={styletd}>{item.id}</td>
          <td className='w-[10%]'>
            <img src={`/images/${item.image}`} alt={item.name} className='w-[100%] object-cover' />
          </td>
          <td className='px-4 py-2'>{item.name}</td>
          <td className={styletd}>{item.state}</td>
        </tr>
      );
    });
  };

  return (
    <div className='category'>
      <div className='header-category'>
        <span className='title center cursor-pointer' onClick={handleReloadu}>CATEGORY</span>
        <input
          className='text-[#000] outline-none bg-[#EEEEEE] p-2 rounded-md w-full '
          type="text"
          placeholder='Search by name'
          value={searchValue}
          onChange={handleSearch}
        />
      </div>
      {functions?.length > 0 && functions.map(item => item.name === 'Create' && item.idPermission === 1 && (
        <div className='form-create'>
          {payload.id ? (
            <>
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'NAME'}
                value={payload.name}
                setValue={setPayload}
                keyPayload={'name'}
                type='text'
                disabled={true}
              />
              <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'IMAGE'}
                value={payload.image}
                setValue={setPayload}
                keyPayload={'image'}
                type='text'
                disabled={true}
              />
            </>
          ) : (
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
                label={'IMAGE'}
                value={payload.image}
                setValue={setPayload}
                keyPayload={'image'}
                type='file'
              />
            </>
          )}
          <div>
            <label className='text-xs mt-4'>STATE</label>
            <select value={payload.state}
              onChange={(e) => setPayload({ ...payload, state: e.target.value })}
              className='text-[#000] outline-none h-[46px] bg-[#cacaca] p-2 rounded-md w-full '>
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
              bgColor='bg-green-800'
              textColor='text-white'
              onClick={handleSubmitUpdate}
            />
          ) : (
            <Button
              class='col-span-2'
              text={'CREATE'}
              bgColor='bg-secondary2'
              textColor='text-white'
              onClick={handleSubmitCreate}
            />
          )}
        </div>
      ))
      }
      <div className='list-table'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-lg'>ID</th>
              <th className='text-lg w-[10%]'>IMAGE</th>
              <th className='text-lg'>NAME</th>
              <th className='text-lg'>STATE</th>
            </tr>
          </thead>
          <tbody>
            {shouldReload && filteredCategories.length > 0 && mapRows(filteredCategories)}
            {!shouldReload && limitcategories?.length > 0 && mapRows(limitcategories)}
          </tbody>
        </table>
      </div>
      <Pagination count={count} currentPage={currentPage}
        setCurrentPage={setCurrentPage} counts={limitcategories}
      />
    </div >
  )
}

export default Category