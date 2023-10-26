import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as actions from '../store/actions';

const RevenueChart = () => {
    const dispatch = useDispatch();
    const { invoices } = useSelector(state => state.invoice);

    const data = invoices?.map(item => item.state === 1 && ({
        day: item?.invoice_detail?.updateAt,
        revenue: item?.total,
    })) || [];

    useEffect(() => {
        dispatch(actions.getTopSelling())
    }, [dispatch])
    // const data = [
    //     { day: '2023-10-01', revenue: 5000 },
    //     { day: '2023-10-02', revenue: 7000 },
    //     { day: '2023-10-03', revenue: 3000 },
    //     { day: '2023-10-04', revenue: 9000 },
    //     { day: '2023-10-05', revenue: 6000 },
    //     { day: '2023-10-06', revenue: 8000 },
    //     { day: '2023-10-07', revenue: 4000 },
    // ];

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value) => `Doanh thu: $${value}`} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default RevenueChart;
