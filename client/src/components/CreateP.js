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
    const [invalidFields, setInvalidFields] = useState([])

    const [payload, setPayload] = useState({
        idCategory: '', idSample: '', image: null, name: '', address: 'Hồ Chí Minh', quantity: '',
        price: '', discount: '', code: '', promotion: '', information: '', idProvider: '', state: '',
    });
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
    const handleSubmit = async () => {
        let finalPayload = { ...payload }; // Tạo một bản sao của payload để không ghi đè trực tiếp lên payload gốc
        finalPayload.image = extractFileName(payload.image);
        let fileInput = document.querySelector('input[type="file"]');
        let file = fileInput.files[0];
        let invalids = validate(finalPayload);
        
        if (invalids === 0) {
            dispatch(actions.createProducts(finalPayload))
                .then(() => {
                    uploadFileAndDispatch(file)
                        .then(response => {
                            console.log('File uploaded to server:', response.data);
                        }).catch(error => {
                            console.error('Error uploading file:', error);
                        });
                })
                .catch(error => { console.error('Error dispatching action:', error); });
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
    }, [dispatch])

    return (
        <div className='w-full grid grid-cols-3 gap-2'>
            <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'ID CATEGORY'}
                value={payload.idCategory}
                setValue={setPayload}
                keyPayload={'idCategory'}
                type='text'
            />
            <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'ID SAMPLE'}
                value={payload.idSample}
                setValue={setPayload}
                keyPayload={'idSample'}
                type='text'
            />
            <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'ID PROVIDER'}
                value={payload.idProvider}
                setValue={setPayload}
                keyPayload={'idProvider'}
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
            <InputForm
                setInvalidFields={setInvalidFields}
                invalidFields={invalidFields}
                label={'CODE'}
                value={payload.code}
                setValue={setPayload}
                keyPayload={'code'}
                type='number'
            />
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
                bgColor='bg-secondary2'
                textColor='text-white'
                onClick={handleSubmit}
            />
        </div>
    )
}

export default CreateP