import React from 'react';
import icons from '../../utils/icons';
import { NavLink } from 'react-router-dom';
const { BsApple } = icons
const Footer = () => {
  return (
    <div className='w-screen bg-secondary1 min-h-[400px] pt-10'>
            <span className='flex gap-2.5 text-4xl text-white ml-40 font-bold hover:cursor-pointer tracking-widest'><BsApple /> APPLE</span>
            <div className='flex w-full justify-between py-10 px-32 text-white text-base leading-9'>
                <div>
                    <ul>
                        <li className='font-extrabold'>Tổng đài</li>
                        <li>Mua hàng: 1900.9696.42 (7:00 - 22:00)</li>
                        <li>CSKH: 1900.9696.43 (8:00 - 21:30)</li>
                        <li>Kết nối với chúng tôi</li>
                        <li>
                            <div className='flex gap-3 leading-9'>
                                <NavLink className='text-[#FFFFFF] text-3xl font-semibold'>{icons.FB}</NavLink>
                                <NavLink className='text-[#FFFFFF] text-3xl font-semibold'>{icons.YT}</NavLink>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className='font-extrabold'>Hệ thống cửa hàng</li>
                        <li>Xem cửa hàng</li>
                        <li>Nội quy cửa hàng</li>
                        <li>Chất lượng phục vụ</li>
                        <li>Chính sách bảo hành</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className='font-extrabold'>Hỗ trợ khách hàng</li>
                        <li>Điều kiện giao dịch chung</li>
                        <li>Hướng dẫn mua hàng online</li>
                        <li>Chính sách giao hàng</li>
                        <li>Hướng dẫn thanh toán</li>
                    </ul>
                </div>
                <div>
                    <ul>
                        <li className='font-extrabold'>Trung tâm bảo hành AppleCare</li>
                        <li>Giới thiệu AppleCare</li>
                    </ul>
                </div>
            </div>
    </div>
  )
}

export default Footer