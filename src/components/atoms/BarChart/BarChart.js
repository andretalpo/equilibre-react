import React from 'react';
import Chart from 'chart.js'
import Formatter from '../../../utils/Formatter';

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
                    display: false,
                    labels: {
                        fontStyle: 'bold'
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            callback: function (value, index, values) {
                                return Formatter.formatStringToCurrency(value);
                            }
                        },
                        gridLines: {
                            display: false
                        }
                    }],
                    yAxes: [{
                        gridLines: {
                            display: false
                        }
                    }]
                },
                tooltips: {
                    callbacks: {
                        label: function (value, data) {
                            return Formatter.formatStringToCurrency(value.xLabel);
                        },
                    }
                },
            }
        });
        Chart.defaults.global.defaultFontFamily = "'Roboto', 'Helvetica', 'Arial', sans-serif";
        Chart.defaults.global.defaultFontColor = 'rgb(102,102,102)';
        Chart.defaults.global.defaultFontSize = 14;
    }

    componentDidUpdate() {
        this.myChart.data.labels = this.props.data.map(d => d.name);
        this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
        this.myChart.update();
    }

}

export default BarChart;