import React from 'react';
import icons from '../../utils/icons';
import { NavLink } from 'react-router-dom';
const { BsApple, AiFillInstagram, BiLogoFacebookCircle, AiFillYoutube } = icons

const Footer = () => {
    return (
        <div className='main-footer'>
            <div className='footer-content'>
                <div>
                    <ul>
                        <li className='font-extrabold'>CONTACT</li>
                        <li>(7:00 - 22:00)<br/>Purchase: 1900.9696.42</li>
                        <li>(8:00 - 21:30)<br/>Customer care: 1900.9696.43</li>
                        <li>Connect with us</li>
                        <li>
                            <div className='flex gap-3 leading-9'>
                                <NavLink className='text-[#FFFFFF] text-3xl font-semibold'><AiFillYoutube/></NavLink>
                                <NavLink className='text-[#FFFFFF] text-3xl font-semibold'><AiFillInstagram/></NavLink>
                                <NavLink className='text-[#FFFFFF] text-3xl font-semibold'><BiLogoFacebookCircle/></NavLink>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className='font-extrabold'>STORE SYSTEM</li>
                        <li>Store location</li>
                        <li>Store rules</li>
                        <li>Service quality</li>
                        <li>Warranty policy</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className='font-extrabold'>CUSTOMER SUPPORT</li>
                        <li>Trading conditions</li>
                        <li>Online shiooing guide</li>
                        <li>Delivery policy</li>
                        <li>Payment instructions</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className='font-extrabold'>SERVICE CENTER</li>
                        <li>Introduce AppleCare</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Footer