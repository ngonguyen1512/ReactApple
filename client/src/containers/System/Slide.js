import React, { useEffect, useState } from 'react'
import { Button, InputForm } from '../../components/index'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

const styletd = 'text-center text-base px-4 py-2 text-base'

const Slide = () => {
    const dispatch = useDispatch()
    const { sliders } = useSelector(state => state.app)
    const [shouldRefetch, setShouldRefetch] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [shouldReload, setShouldReload] = useState(false);
    const [invalidFields, setInvalidFields] = useState([])

    const [payload, setPayload] = useState({
        id: '' || null, name: '', url: '', state: ''
    });
    const handleReload = async () => {
        setPayload({ id: '', name: '', url: '', state: '' });
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
        finalPayload.url = extractFileName(payload.url);
        let fileInput = document.querySelector('input[type="file"]');
        let file = fileInput.files[0];
        let invalids = validate(finalPayload);
        if (invalids === 0) {
            dispatch(actions.createSliders(finalPayload)).then(() => {
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
        dispatch(actions.updateSliders(payload))
        setShouldRefetch(true);
    }
    const handleSubmitDelete = async () => {
        dispatch(actions.deleteSliders(payload))
        setPayload({ id: '', name: '', url: '', state: '' });
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

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
        setShouldReload(event.target.value !== "");
    };
    let filteredSliders = [];
    if (sliders && Array.isArray(sliders)) {
        filteredSliders = sliders.filter((item) =>
            item.name.includes(searchValue)
        );
    }

    useEffect(() => {
        dispatch(actions.getSliders())
    })
    useEffect(() => {
        if (shouldRefetch) {
            dispatch(actions.getSliders())
            setShouldRefetch(false);
        }
    }, [dispatch, shouldRefetch])

    const mapRows = (data) => {
        return data.map((item) => {
            const handleClickRow = () => {
                setPayload({ ...payload, id: item.id, name: item.name, url: item.url, state: item.state });
            };
            return (
                <tr key={item.id} onClick={handleClickRow} className='hover:bg-blue-200 cursor-pointer'>
                    <td className={styletd}>{item.id}</td>
                    <td className='w-[25%]'>
                        <img src={`/images/${item.url}`} alt={item.name} className='w-[100%] object-cover' />
                    </td>
                    <td className='px-4 py-2'>{item.name}</td>
                    <td className={styletd}>{item.state}</td>
                </tr>
            );
        });
    };
    return (
        <div className='slider'>
            <div className='header-slider'>
                <span className='title center cursor-pointer' onClick={handleReload}>SLIDE</span>
                <input
                    className='text-[#000] outline-none bg-[#EEEEEE] p-2 rounded-md w-full '
                    type="text"
                    placeholder='Search by name'
                    value={searchValue}
                    onChange={handleSearch}
                />
            </div>
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
                            value={payload.url}
                            setValue={setPayload}
                            keyPayload={'url'}
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
                            value={payload.url}
                            setValue={setPayload}
                            keyPayload={'url'}
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
                    <div className='btn-slider'>
                        <Button
                            class='col-span-2'
                            text={'UPDATE'}
                            value={payload.id}
                            setValue={setPayload}
                            bgColor='bg-green-800'
                            textColor='text-white'
                            onClick={handleSubmitUpdate}
                        />
                        <Button
                            class='col-span-2'
                            text={'DELETE'}
                            value={payload.id}
                            setValue={setPayload}
                            bgColor='bg-cancel'
                            textColor='text-white'
                            onClick={handleSubmitDelete}
                        />
                    </div>
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
            <div className='list-table h-96'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='text-lg'>ID</th>
                            <th className='text-lg w-[25%]'>IMAGE</th>
                            <th className='text-lg'>NAME</th>
                            <th className='text-lg'>STATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shouldReload && filteredSliders.length > 0 && mapRows(filteredSliders)}
                        {!shouldReload && sliders?.length > 0 && mapRows(sliders)}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Slide