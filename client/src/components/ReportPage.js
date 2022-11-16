import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ApexCharts from 'apexcharts';
import Table from 'react-bootstrap/Table';

const ReportPage = () => {
    useEffect(() => {
        document.title = "Report | MOCA";
    }, []);

    var bar_chart_options = {
        series: [{ data: [21, 22, 10, 28, 16, 21] }],
        chart: {
            width: 480,
            height: 350,
            type: 'bar',
        },
        colors: ["#008FFB", "#2ecc71", "#FEB019", "#FF4560", "#775DD0", "#81D4FA"],
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true,
            }
        },
        xaxis: {
            categories: [
                ['Category', 'A'],
                ['Category', 'B'],
                ['Category', 'C'],
                ['Category', 'D'],
                ['Category', 'E'],
                ['Category', 'F'],
            ],
            labels: {
                style: {
                    colors: "blue",
                    fontSize: '12px'
                }
            }
        }
    };

    useEffect(() => {
        var chart = new ApexCharts(document.querySelector('#bar-chart'), bar_chart_options);
        chart.render();
    }, [bar_chart_options]);

    var pie_options = {
        series: [37.9, 6.9, 17.2, 13.8, 24.1],
        chart: {
            width: 480,
            type: 'pie',
        },
        labels: ['Work', 'Eat', 'Commute', 'Watch TV', 'Sleep'],
        fill: {
            colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"]
        },
        colors: ["#008FFB", "#2ecc71", "#FEB019", "#FF4560", "#775DD0"],
        dataLabels: {
            style: {
            }
        },
        responsive: [
            {
                breakpoint: 330,
                options: {
                    chart: {
                        width: 250,
                    },
                    legend: {
                        show: false,
                        position: 'bottom'
                    }
                }
            },
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 340,
                    },
                    legend: {
                        show: false,
                        position: 'bottom'
                    },
                    dataLabels: {
                        formatter: function (val, opts) {
                            var lab = opts.w.config.labels[opts.seriesIndex];
                            return lab + ':' + val + '%';
                        },
                        style: {
                            // colors: ["#008FFB", "#2ecc71", "#FEB019", "#FF4560", "#775DD0", "#81D4FA"]
                        }
                    }
                }
            }
        ]
    };

    useEffect(() => {
        var chart = new ApexCharts(document.querySelector('#pie-chart'), pie_options);
        chart.render();
    }, [pie_options]);

    return (
        <Fragment>
            <div className="container individual-page">
                <div className="pb-5">
                    <Link to="/"><Button color="bg-primary" className="px-5">Go Back</Button></Link>
                </div>
                <div className="row pt-5 pb-5">
                    <div className="col-md-6 col-sm-12">
                        <div id="bar-chart"></div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div id="pie-chart"></div>
                    </div>
                </div>
                <div className="row pb-5">
                    <div className="col-12 overflow-scroll">
                        <Table striped size="sm">
                            <thead bordered-0>
                                <tr>
                                    <th>Region Sales Stage</th>
                                    <th>Central Opportunity Count</th>
                                    <th>Revenue</th>
                                    <th>East Opportunity Count</th>
                                    <th>Revenue</th>
                                    <th>West Opportunity Count</th>
                                    <th>Revenue</th>
                                    <th>Total Opportunity Count</th>
                                    <th>Revenue</th>
                                </tr>
                            </thead>
                            <tbody bordered hover>
                                <tr>
                                    <td className="row-title">Lead</td>
                                    <td className="text-right">91</td>
                                    <td className="text-right">$441,003,315</td>
                                    <td className="text-right">101</td>
                                    <td className="text-right">$419,536,437</td>
                                    <td className="text-right">47</td>
                                    <td className="text-right">$234,397,428</td>
                                    <td className="text-right">239</td>
                                    <td className="text-right">$1,094,967,180</td>
                                </tr>
                                <tr>
                                    <td className="row-title">Quality</td>
                                    <td className="text-right">129</td>
                                    <td className="text-right">$111,715,461</td>
                                    <td className="text-right">50</td>
                                    <td className="text-right">$195,692,154</td>
                                    <td className="text-right">15</td>
                                    <td className="text-right">$53,442,363</td>
                                    <td className="text-right">94</td>
                                    <td className="text-right">$359,849,978</td>
                                </tr>
                                <tr>
                                    <td className="row-title">Solution</td>
                                    <td className="text-right">29</td>
                                    <td className="text-right">$100,743,789</td>
                                    <td className="text-right">30</td>
                                    <td className="text-right">$134,347,170</td>
                                    <td className="text-right">15</td>
                                    <td className="text-right">$53,441,501</td>
                                    <td className="text-right">74</td>
                                    <td className="text-right">$228,532,460</td>
                                </tr>
                                <tr>
                                    <td className="row-title">Proposal</td>
                                    <td className="text-right">14</td>
                                    <td className="text-right">$46,722,869</td>
                                    <td className="text-right">13</td>
                                    <td className="text-right">$59,970,924</td>
                                    <td className="text-right">10</td>
                                    <td className="text-right">$43,032,669</td>
                                    <td className="text-right">37</td>
                                    <td className="text-right">$149,726,462</td>
                                </tr>
                                <tr>
                                    <td className="row-title">Finalize</td>
                                    <td className="text-right">5</td>
                                    <td className="text-right">$23,302,246</td>
                                    <td className="text-right">5</td>
                                    <td className="text-right">$30,696,428</td>
                                    <td className="text-right">4</td>
                                    <td className="text-right">$21,176,185</td>
                                    <td className="text-right">14</td>
                                    <td className="text-right">$75,174,859</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th className="row-title">Total</th>
                                    <th className="text-right">168</th>
                                    <th className="text-right">$723,517,680</th>
                                    <th className="text-right">199</th>
                                    <th className="text-right">$840,243,113</th>
                                    <th className="text-right">91</th>
                                    <th className="text-right">$404,490,146</th>
                                    <th className="text-right">458</th>
                                    <th className="text-right">$1,968,250,939</th>
                                </tr>
                            </tfoot>
                        </Table>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ReportPage;