import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import * as actions from '../store/actions';

const Chart = () => {
    const dispatch = useDispatch();
    const { topselling } = useSelector(state => state.invoice);

    const data = topselling?.map(item => ({
        name: item?.product_invoicedetail?.name,
        value: item?.totalSold,
        total: (item?.totalSold * item?.product_invoicedetail.price).toLocaleString(),
    })) || [];

    useEffect(() => {
        dispatch(actions.getTopSelling())
    }, [dispatch])

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value, name, props) => [`${name}: ${value}`, `Total: ${props.payload.total}`]} />
                <Legend />
                <Bar dataKey="value" fill="#3B82F6" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default Chart;
