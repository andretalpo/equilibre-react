import React, { PureComponent } from 'react';
import './CompPieChart.css'
import {
  PieChart, Pie, Cell, Legend
} from 'recharts';
import Skeleton from '@material-ui/lab/Skeleton';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

class CompPieChart extends PureComponent {

  render() {

    if (this.props.data) {
      this.props.data.splice(0, 1);
    }

    return (
      <>
        {
          this.props.data === 0
            ?
            <Skeleton animation="wave" />
            :
            <PieChart width={290} height={375}>
              <Legend verticalAlign="top" height={36} />
              <Pie
                data={this.props.data}
                cx={140}
                cy={175}
                labelLine={false}
                label={renderCustomizedLabel}
                innerRadius={70}
                outerRadius={145}
                fill="#8884d8"
                dataKey="result"
                isAnimationActive={false}
              >
                {
                  this.props.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
            </PieChart>
        }
      </>
    );
  }
}

export default CompPieChart;