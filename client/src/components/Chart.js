import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as actions from '../store/actions';

const Chart = () => {
    const dispatch = useDispatch();
    const { topselling } = useSelector(state => state.invoice);

    const data = topselling?.map(item => ({
        name: item?.product_invoicedetail?.name,
        quantity: item?.totalSold,
        total: (item?.totalSold * item?.product_invoicedetail.price).toLocaleString(),
    })) || [];

    useEffect(() => {
        dispatch(actions.getTopSelling())
    }, [dispatch])

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) 
            return (
                <div className="custom-tooltip">
                    <div className="label">{label}</div>
                    <div className="quantity">Quantity: {payload[0].value}</div>
                    <div className="total">Total: {payload[0].payload.total} VND</div>
                </div>
            );
        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <XAxis stroke="#fff" dataKey="name" />
                <YAxis stroke="#fff" />
                <Tooltip content={<CustomTooltip />} />
                {/* <Legend /> */}
                <Bar dataKey="quantity" fill="#3B82F6" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Chart;
