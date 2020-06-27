import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList } from 'recharts';

const ValueByCategoryGraph = ({ categories }) => {

    return (
        <BarChart width={300} height={300} data={categories} layout="vertical" 
            margin={{ top: 5, right: 15, left: 15, bottom: 5 }}>
            <XAxis type="number" hide/>
            <YAxis type="category" dataKey="name" />
            <Tooltip />
            <Bar dataKey="value" fill="#4CAF50" >
                <LabelList dataKey="value" position="right" />
            </Bar>
        </BarChart>
    );
}

export default ValueByCategoryGraph;