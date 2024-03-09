import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, Typography, Grid } from '@mui/material';
import Stack from '@mui/material/Stack';

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
      <Card component={Stack}
      spacing={3}
      direction="column"
      sx={{px: 3, py: 5, borderRadius: 2, backgroundColor:'background.secondary'}}>
        <Grid container direction={"column"}>
          <Grid item xs={10} >
              <Typography variant="h5" fontWeight={500}>I Learning Progress</Typography>
              <Typography variant="body1" fontWeight={500} sx={{mb:2, color:'grey' }}> (-3% than today)</Typography>
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>
        </Card>
    );
  }
}
