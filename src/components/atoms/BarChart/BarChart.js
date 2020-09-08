import React from 'react';
import Chart from 'chart.js'

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.chartRef = React.createRef();
    }

    render() {
        console.log(this.props)
        return (
            <canvas ref={this.chartRef} />
        );
    }

    componentDidMount() {
        this.myChart = new Chart(this.chartRef.current, {
            type: 'horizontalBar',
            data: {
                labels: this.props.data.map(d => d.name),
                datasets: [
                    {
                        label: this.props.title,
                        data: this.props.data.map(d => d.value),
                        backgroundColor: this.props.color
                    }
                ],
            },
            options: {
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        gridLines: {
                            display:false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display:false
                        }   
                    }]
                },
            }
        });
        Chart.defaults.global.defaultFontFamily = "'Roboto', 'Helvetica', 'Arial', sans-serif";
        Chart.defaults.global.defaultFontColor = 'rgb(102,102,102)';
        // Chart.defaults.global.defaultFontSize = 14;
    }

    componentDidUpdate() {
        this.myChart.data.labels = this.props.data.map(d => d.name);
        this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
        this.myChart.update();
    }

}

export default BarChart;