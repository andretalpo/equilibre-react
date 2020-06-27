import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, LabelList, ResponsiveContainer } from 'recharts';

const ValueByCategoryGraph = ({ categories }) => {

    return (
        <ResponsiveContainer width='100%' aspect={4.0/3.0}>
            <BarChart data={categories} layout="vertical"
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" />
                <Tooltip />
                <Bar dataKey="value" fill="#4CAF50" >
                    <LabelList dataKey="value" position="insideTopRight" formatter={value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default ValueByCategoryGraph;