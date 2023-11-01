import React, { useEffect } from 'react';
import { formatVietnameseToString } from '../utils/common/formatVietnameseToString';
import { NavLink } from 'react-router-dom';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import * as actions from '../store/actions';
import { useDispatch, useSelector } from 'react-redux';

const Slider = () => {
    const dispatch = useDispatch();
    const { sliders } = useSelector(state => state.app);
    useEffect(() => {
        dispatch(actions.getSliders());
    })

    return (
        <div className='w-full jusitify-center items-center '>
            <Fade>
                {sliders.map(item => item.state === 1 && (
                    <NavLink to={`${formatVietnameseToString(item.name)}`}>
                        <div key={item.id}>
                            <img style={{ width: '100%' }} src={`/images/${item.url}`} alt='' />
                        </div>
                    </NavLink>
                ))}
            </Fade>
        </div>

    )
}

export default Slider;