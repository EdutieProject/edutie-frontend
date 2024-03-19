import { Typography } from '@mui/material';
import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Logical', value: 400 },
  { name: 'Musical', value: 300 },
  { name: 'Interpersonal', value: 300 },
  { name: 'Bodily', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default class Example extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width={555} height={400}>
      
        <PieChart width={1000} height={1000} onMouseEnter={this.onPieEnter} >
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={140}
            fill="#8884d8"
            paddingAngle={1}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend verticalAlign='bottom'/>
        </PieChart>
      </ResponsiveContainer>
    );
  }
}
