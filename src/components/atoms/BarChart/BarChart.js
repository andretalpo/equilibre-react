import React from 'react';
import Chart from 'chart.js'

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.data = [
            {
                "name": "A",
                "value": 46
            },
            {
                "name": "B",
                "value": 87
            }
        ]
        this.chartRef = React.createRef();
    }

    render() {
        return (
            <canvas ref={this.chartRef} />
        );
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'bar',
            data: {
                labels: this.data.map(d => d.name),
                datasets: [
                    {
                        label: 'data',
                        data: this.data.map(d => d.value),
                        backgroundColor: '#ffffff'
                    }
                ]
            }
        });
    }

}

export default BarChart;