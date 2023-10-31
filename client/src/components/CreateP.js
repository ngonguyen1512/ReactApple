import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../store/actions'
import { InputForm, Button } from './index'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const CreateP = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { msg, update } = useSelector(state => state.product)
    const { providers } = useSelector(state => state.provider)
    const { categories, samples, prices } = useSelector(state => state.app)
    const [invalidFields, setInvalidFields] = useState([])

    const [payload, setPayload] = useState({
        idCategory: '', idSample: '', image: null, name: '', address: 'Hồ Chí Minh', quantity: '',
        price: '', discount: '', code: '', promotion: '', information: '', idProvider: '', state: '',
    });
    // Hàm trích xuất tên file từ đường dẫn file
    const extractFileName = (path) => {
        const fileName = path.split('\\').pop();
        return fileName !== undefined ? fileName : '';
    };
    // Hàm thực hiện việc upload file và gửi lên server
    const uploadFileAndDispatch = (file) => {
        const formData = new FormData();
        formData.append('file', file);
        return axios.post('http://localhost:5000/api/v1/image/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    };
    const handleSubmit = async () => {
        let finalPayload = { ...payload }; // Tạo một bản sao của payload để không ghi đè trực tiếp lên payload gốc
        finalPayload.image = extractFileName(payload.image); // Trích xuất tên file từ payload.image
        let fileInput = document.querySelector('input[type="file"]'); // Lấy đối tượng input file từ DO
        let file = fileInput.files[0]; // Lấy file từ đối tượng input
        let invalids = validate(finalPayload);

        if (invalids === 0) {
            dispatch(actions.createProducts(finalPayload)).then(() => {
                uploadFileAndDispatch(file)
                    .then(response => {
                        console.log('File uploaded to server:', response.data);
                    }).catch(error => {
                        console.error('Error uploading file:', error);
                    });
            }).catch(error => { console.error('Error dispatching action:', error); });
            navigate('/webserver/product')
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
            } else if (item[1] !== '')
                switch (item[0]) {
                    case 'state': {
                        if (+item[1] !== 1 && +item[1] !== 0) {
                            setInvalidFields(prev => [...prev, { name: item[0], msg: 'Mã trạng thái không hợp lệ!' }]);
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
        dispatch(actions.getCategories())
        dispatch(actions.getProviders())
        dispatch(actions.getCategories())
        dispatch(actions.getSamples())
        dispatch(actions.getPrices());
    }, [dispatch])

    return (
        <div className='w-full grid grid-cols-3 gap-2'>
            <div className='dropselect'>
                <label className='text-xs mt-4'>ID CATEGORY</label>
                <select value={payload.idCategory}
                    onChange={(e) => setPayload({ ...payload, idCategory: e.target.value })}
                    className='outline-none bg-[#cacaca] h-[46px] p-2 rounded-md w-full text-[#000]' >
                    <option value="">Select ID CATEGORY</option>
                    {categories?.length > 0 && categories.map(item => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div className='dropselect'>
                <label className='text-xs mt-4'>ID SAMPLE</label>
                <select value={payload.idSample}
                    onChange={(e) => setPayload({ ...payload, idSample: e.target.value })}
                    className='outline-none bg-[#cacaca] h-[46px] p-2 rounded-md w-full text-[#000]' >
                    <option value="">Select ID SAMPLE</option>
                    {samples?.length > 0 && samples.map(item => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <div className='dropselect'>
                <label className='text-xs mt-4'>ID PROVIDER</label>
                <select value={payload.idPermission}
                    onChange={(e) => setPayload({ ...payload, idProvider: e.target.value })}
                    className='outline-none bg-[#cacaca] h-[46px] p-2 rounded-md w-full text-[#000]' >
                    <option value="">Select ID PROVIDER</option>
                    {providers?.length > 0 && providers.map(item => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </select>
            </div>
            <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'IMAGE'}
                value={payload.image}
                setValue={setPayload}
                keyPayload={'image'}
                type='file'
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
                label={'ADDRESS'}
                value={payload.address}
                setValue={setPayload}
                keyPayload={'address'}
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
            <div className='dropselect'>
                <label className='text-xs mt-4'>ID CODE</label>
                <select value={payload.code}
                    onChange={(e) => setPayload({ ...payload, code: e.target.value })}
                    className='outline-none bg-[#cacaca] h-[46px] p-2 rounded-md w-full text-[#000]' >
                    <option value="">Select CODE</option>
                    {prices?.length > 0 && prices.map(item => (
                        <option value={item.id}>{item.value}</option>
                    ))}
                </select>
            </div>
            <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'PROMOTION'}
                value={payload.promotion}
                setValue={setPayload}
                keyPayload={'promotion'}
                type='text'
            />
            <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'INFORMATION'}
                value={payload.information}
                setValue={setPayload}
                keyPayload={'information'}
                type='text'
            />
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
            <Button
                class='col-span-2'
                text={'Save'}
                bgColor='bg-secondary2'
                textColor='text-white'
                onClick={handleSubmit}
            />
        </div>
    )
}

export default CreateP