import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '0',
    uv: 7500,
    pv: 2400,
    amt: 2400,
  },
  {
    name: '20%',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: '40%',
    uv: 6500,
    pv: 9800,
    amt: 2290,
  },
  {
    name: '60%',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: '80%',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: '100%',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  
];

export default class Example extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width={"90%"} height={400}>
        <LineChart
          
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" name="Analiza Matematyczna" dataKey="pv" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line type="monotone" name="Matematyka Dyskretna" dataKey="uv" stroke="#82ca9d" />
        </LineChart>
        </ResponsiveContainer>
    );
  }
}
