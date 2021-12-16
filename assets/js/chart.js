var SpringOscillationChart = (function () {
    var ctx = null;
    var chart = null;
    return {
        init: function (pdata, pwidth, pheight) {
            chart = Highcharts.chart('myChart', {
                chart: {
                    type: 'spline',
                    width: pwidth,
                    height: pheight,
                    animation: false

                },
                plotOptions: {
                    series: {
                        enableMouseTracking: false,
                        lineWidth: 2
                    }
                },
                xAxis: {
                    title: {
                        text: 'Time (Sec)',
                        enabled: false
                    },
                    labels: {
                        enabled: false
                    },
                    min: 0,
                    max: 15,
                    tickInterval: 1,
                    gridLineWidth: 1,
                    lineWidth: 0,
                    minorTickLength: 0,
                    tickLength: 0,
                    gridLineColor: '#F9E9E9',
                    gridLineDashStyle: 'longdash'
                },
                title: false,
                subtitle: false,
                yAxis: {
                    title: {
                        text: 'Displacement (cm)',
                        enabled: true,
                        align: 'high',
                        style: {
                            color: "#545454",
                            fontSize: '14px',
                            fontWeight: 'bold',
                            margin: -10
                        }
                    },
                    labels: {
                        style: {
                            color: "#545454",
                            fontFamily: "Montserrat-SemiBold"
                        }
                    },
                    min: -70,
                    max: 70,
                    tickInterval: 10,
                    gridLineWidth: 1,
                    tickLength: 5,
                    lineWidth: 1,
                    majorTickPosition: "outside",
                    minorGridLineWidth: 0,
                    minorTickInterval: 10,
                    minorTickLength: 10,
                    minorTickWidth: 1,
                    minorTickColor: '#F9E9E9',
                    gridLineColor: '#F9E9E9',
                    gridLineDashStyle: 'longdash'
                },
                legend: {
                    enabled: false
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: "",
                    color: "#0505ff",
                    marker: {
                        enabled: false
                    },
                    data: []
                }]
            });

            $("text.highcharts-axis-title").attr("x",35);

        },
        update: function (datapoint) {
            //chart.series[0].addPoint([datapoint.x, datapoint.y], true);
            chart.series[0].addPoint(datapoint, true, false);
            //chart.redraw();
        },
        clearSeriesData: function () {
            chart.series[0].setData([]);
        }
    }
})();