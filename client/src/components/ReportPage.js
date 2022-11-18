import React, { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ApexCharts from "apexcharts";
import Table from "react-bootstrap/Table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReportPage = () => {
  const [individualResult, setIndividualResult] = useState([]);
  const [groupResult, setGroupResult] = useState([]);
  const [datePicker, setDatePicker] = useState(new Date());

  useEffect(() => {
    document.title = "Report | MOCA";
  }, []);

  const splitDate = (str) => {
    let date = new Date(str),
      year = date.getFullYear(),
      month = date.getMonth() + 1,
      m = ("0" + month.toString()).substr(-2),
      dt = date.getDate(),
      d = ("0" + dt.toString()).substr(-2);
    return { date: [year, m, d] };
  };

  const handleDate = (str) => {
    let datetime = splitDate(str);
    return datetime.date.join("-");
  };

  var bar_chart_options = {
    series: [{ data: [21, 22, 10, 28, 16, 21] }],
    chart: {
      width: 480,
      height: 350,
      type: "bar",
    },
    colors: ["#008FFB", "#2ecc71", "#FEB019", "#FF4560", "#775DD0", "#81D4FA"],
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
    xaxis: {
      categories: [
        ["Category", "A"],
        ["Category", "B"],
        ["Category", "C"],
        ["Category", "D"],
        ["Category", "E"],
        ["Category", "F"],
      ],
      labels: {
        style: {
          colors: "blue",
          fontSize: "12px",
        },
      },
    },
  };

  var pie_options = {
    series: [37.9, 6.9, 17.2, 13.8, 24.1],
    chart: {
      width: 480,
      type: "pie",
    },
    labels: ["Work", "Eat", "Commute", "Watch TV", "Sleep"],
    fill: {
      colors: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
    },
    colors: ["#008FFB", "#2ecc71", "#FEB019", "#FF4560", "#775DD0"],
    dataLabels: {
      style: {},
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
            position: "bottom",
          },
        },
      },
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 340,
          },
          legend: {
            show: false,
            position: "bottom",
          },
          dataLabels: {
            formatter: function (val, opts) {
              var lab = opts.w.config.labels[opts.seriesIndex];
              return lab + ":" + val + "%";
            },
            style: {
              // colors: ["#008FFB", "#2ecc71", "#FEB019", "#FF4560", "#775DD0", "#81D4FA"]
            },
          },
        },
      },
    ],
  };

  useEffect(() => {
    var chart = new ApexCharts(
      document.querySelector("#bar-chart"),
      bar_chart_options
    );
    chart.render();
    var chart1 = new ApexCharts(
      document.querySelector("#pie-chart"),
      pie_options
    );
    chart1.render();

    getAllIndividual();
    getAllGroup();

  }, []);

  const getAllIndividual = async () => {
    const res = await fetch("/individuals");
    const individualArray = await res.json();
    setIndividualResult(individualArray);
  };

  const getAllGroup = async () => {
    const res = await fetch("/groups");
    const groupArray = await res.json();
    setGroupResult(groupArray);
  };

  const handleOnChangeDatePicker = (date) => {
    setDatePicker(date);
  };

  return (
    <Fragment>
      <div className="container individual-page">
        <div className="pb-5 d-flex justify-content-between">
          <Link to="/">
            <Button color="bg-primary" className="px-5">
              Go Back
            </Button>
          </Link>
          <Button color="bg-success" className="px-5 bg-success success">
            Print
          </Button>
        </div>
        <div className="row  pb-5">
            <div className="col-md-4 col-sm-12">
            <Form.Group>
                  <Form.Label>Date</Form.Label>
                  <DatePicker
                    id="datepicker"
                    className="rounded-5 shadow form-control"
                    selected={datePicker}
                    onChange={handleOnChangeDatePicker}
                  />
                </Form.Group>
            </div>
            <div className="col-md-4 col-sm-12">

            </div>
            <div className="col-md-4 col-sm-12">

            </div>
        </div>
        <div className="row pb-5">
          <div className="col-md-6 col-sm-12">
            <div id="bar-chart"></div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div id="pie-chart"></div>
          </div>
        </div>
        <div className="row pb-5">
          <div className="text-center">
            <h2>Individual</h2>
          </div>
          <div className="col-12 overflow-scroll">
            <Table striped size="sm">
              <thead bordered-0="true">
                <tr>
                  <th>Associate Initials</th>
                  <th>Date</th>
                  <th>First Time Visitor</th>
                  <th>Repeat Visitor</th>
                  <th>Youth</th>
                  <th>Teen</th>
                  <th>College</th>
                  <th>Adult</th>
                  <th>Senior</th>
                  <th>Postal Code</th>
                  <th>OutSide U.S.</th>
                  <th>MoCa Member</th>
                  <th>MoCa Email</th>
                </tr>
              </thead>
              <tbody bordered="true" hover="true">
                {individualResult.map((item) => (
                  <tr key={item._id}>
                    <td className="row-title">{item.associate_initial}</td>
                    <td>{item.updated_at}</td>
                    <td>{item.first_time_visitor}</td>
                    <td>{item.repeat_visitor}</td>
                    <td>{item.individual_num_youth}</td>
                    <td>{item.individual_num_teen}</td>
                    <td>{item.individual_num_college}</td>
                    <td>{item.individual_num_adult}</td>
                    <td>{item.individual_num_senior}</td>
                    <td>{item.postal_code}</td>
                    <td>{item.outside_us}</td>
                    <td>{item.moca_member}</td>
                    <td>{item.moca_email}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  {/* <th className="row-title">Total</th>
                  <th className="text-right">168</th>
                  <th className="text-right">$723,517,680</th>
                  <th className="text-right">199</th>
                  <th className="text-right">$840,243,113</th>
                  <th className="text-right">91</th>
                  <th className="text-right">$404,490,146</th>
                  <th className="text-right">458</th>
                  <th className="text-right">$1,968,250,939</th> */}
                </tr>
              </tfoot>
            </Table>
          </div>
        </div>
        <div className="row pb-5">
          <div className="text-center">
            <h2>Group</h2>
          </div>
          <div className="col-12 overflow-scroll">
            <Table striped size="sm">
              <thead bordered-0="true">
                <tr>
                  <th>Associate Initials</th>
                  <th>Date</th>
                  <th>Youth</th>
                  <th>Teen</th>
                  <th>College</th>
                  <th>Adult</th>
                  <th>Senior</th>
                  <th>Postal Code</th>
                  <th>OutSide U.S.</th>
                </tr>
              </thead>
              <tbody bordered="true" hover="true">
                {groupResult.map((item) => (
                  <tr key={item._id}>
                    <td className="row-title">{item.associate_initial}</td>
                    <td>{item.updated_at}</td>
                    <td>{item.individual_num_youth}</td>
                    <td>{item.individual_num_teen}</td>
                    <td>{item.individual_num_college}</td>
                    <td>{item.individual_num_adult}</td>
                    <td>{item.individual_num_senior}</td>
                    <td>{item.postal_code}</td>
                    <td>{item.outside_us}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr></tr>
              </tfoot>
            </Table>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ReportPage;
