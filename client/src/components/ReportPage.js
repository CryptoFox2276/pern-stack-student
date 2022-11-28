import React, { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
// import ApexCharts from "apexcharts";
import Chart from "react-apexcharts";
import Table from "react-bootstrap/Table";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ReactApexChart from "react-apexcharts";

const ReportPage = () => {
  const [collectData, setCollectData] = useState([]);
  const [groupResult, setGroupResult] = useState([]);
  const [startDatePicker, setStartDatePicker] = useState(new Date());
  const [endDatePicker, setEndDatePicker] = useState(new Date());
  const [searchPostalCode, setSearchPostalCode] = useState("");
  const [barData, setBarData] = useState([]);

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

  const series = [{ data: barData }];

  var bar_chart_options = {
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
      categories: [["Youth"], ["Teen"], ["Collage"], ["Adult"], ["Senior"]],
      labels: {
        style: {
          colors: "blue",
          fontSize: "12px",
        },
      },
    },
  };

  // const pie_series = [37.9, 6.9, 17.2, 13.8, 24.1];
  // const labels = ["Work", "Eat", "Commute", "Watch TV", "Sleep"];

  const [pieSeries, setPieSeries] = useState([]);
  const [pieLabels, setPieLabels] = useState([]);

  var pie_options = {
    chart: {
      width: 480,
      type: "pie",
    },
    // labels: ["Work", "Eat", "Commute", "Watch TV", "Sleep"],
    labels: pieLabels,
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
    getAllCollects();
  }, []);

  const getAllCollects = async () => {
    const res = await fetch(`/collects?postal_code=${searchPostalCode}`);
    const resArray = await res.json();
    var filteredData = [];
    resArray.map((item) => {
      let temp = new Date(item.created_at);

      if (
        parseInt(temp.getTime()) >= parseInt(startDatePicker.getTime()) &&
        parseInt(temp.getTime()) <= parseInt(endDatePicker.getTime())
      ) {
        filteredData.push(item);
      }

      let sum_youth = filteredData.reduce(
        (a, b) => a + b.individual_num_youth,
        0
      );
      let sum_teen = filteredData.reduce(
        (a, b) => a + b.individual_num_teen,
        0
      );
      let sum_college = filteredData.reduce(
        (a, b) => a + b.individual_num_college,
        0
      );
      let sum_adult = filteredData.reduce(
        (a, b) => a + b.individual_num_adult,
        0
      );
      let sum_senior = filteredData.reduce(
        (a, b) => a + b.individual_num_senior,
        0
      );
      setBarData([sum_youth, sum_teen, sum_college, sum_adult, sum_senior]);

      // processing by postal code
      var postalCodeNames = [],
        postalCodes = [];
      var buff_series = [],
        buff_labels = [];
      var index = 0;

      filteredData.map((item) => {
        if (!postalCodeNames.includes(item.postal_code))
          postalCodeNames.push(item.postal_code);
      });

      postalCodeNames.map((pc) => {
        postalCodes[index] = { name: pc, count: 0 };
        filteredData.map((item) => {
          if (item.postal_code === pc) {
            postalCodes[index].count += 1;
          }
        });
        index++;
      });

      postalCodes
        .sort((a, b) => {
          return b.count - a.count;
        })
        .map((item) => {
          return (item.count = 100 * (item.count / postalCodes.length));
        });

      postalCodes.slice(0, 6).map((item) => {
        buff_labels.push(item.name);
        buff_series.push(item.count);
      });

      setPieLabels(buff_labels);
      setPieSeries(buff_series);
    });

    setCollectData(filteredData);
  };

  const handleOnChangeStartDatePicker = (date) => {
    setStartDatePicker(date);
  };
  const handleOnChangeEndDatePicker = (date) => {
    setEndDatePicker(date);
  };
  const handleOnChangePostalCode = (e) => {
    console.log(e.target.value);
    setSearchPostalCode(e.target.value);
  };

  const handleSearch = () => {
    getAllCollects();
  };

  const handleOnPrinting = () => {
    window.print();
  }

  return (
    <Fragment>
      <div className=" individual-page">
        <div className="container pb-3 d-flex justify-content-between">
          <Link to="/">
            <Button color="bg-primary" className="px-5">
              Go Back
            </Button>
          </Link>
          <Button color="bg-success" className="px-5 bg-success success" onClick={handleOnPrinting}>
            Print
          </Button>
        </div>
        <hr />
        <div className="container">
          <div className="row pb-3">
            <div className="col-md-3 col-sm-12">
              <Form.Group>
                <Form.Label>From Date</Form.Label>
                <DatePicker
                  id="startDatePicker"
                  className="rounded-5 shadow form-control"
                  selected={startDatePicker}
                  onChange={handleOnChangeStartDatePicker}
                />
              </Form.Group>
            </div>
            <div className="col-md-3 col-sm-12">
              <Form.Group>
                <Form.Label>To Date</Form.Label>
                <DatePicker
                  id="endDatePicker"
                  className="rounded-5 shadow form-control"
                  selected={endDatePicker}
                  onChange={handleOnChangeEndDatePicker}
                />
              </Form.Group>
            </div>
            <div className="col-md-3 col-sm-12">
              <Form.Group>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control
                  as="input"
                  name="postal_code"
                  value={searchPostalCode}
                  className="rounded-5 shadow"
                  placeholder="Postal Code..."
                  onChange={handleOnChangePostalCode}
                ></Form.Control>
              </Form.Group>
            </div>
            <div className="col-md-3 col-sm-12 m-auto">
              <Form.Group className="d-flex m-auto justify-content-center">
                <Button
                  className="rounded-5 shadow w-75"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Form.Group>
            </div>
            <div className="col-md-4 col-sm-12"></div>
            <div className="col-md-4 col-sm-12"></div>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="row pt-3 pb-5">
            <div className="col-md-6 col-sm-12 pt-3">
              {/* <div id="bar-chart"></div> */}
              <Form.Group className="row m-auto">
                <Form.Label className="text-center">
                  <h5>Statistic Data by Age Groups</h5>
                </Form.Label>
                <Chart
                  options={bar_chart_options}
                  series={series}
                  type="bar"
                  width={"100%"}
                  height={320}
                />
              </Form.Group>
            </div>
            <div className="col-md-6 col-sm-12 pt-3">
              <div>
                <Form.Group id="pie-chart" className="row m-auto">
                  <Form.Label className="text-center">
                    <h5>Statistic Data by Postal Code</h5>
                  </Form.Label>
                  <ReactApexChart
                    options={pie_options}
                    series={pieSeries}
                    type="pie"
                    width={"100%"}
                    height={320}
                  />
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row pt-3 pb-5">
            <div className="text-center pb-2">
              <h2>Collection Data Table</h2>
            </div>
            <div className="col-12 overflow-auto">
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
                    <th>Institution</th>
                    <th>Postal Code</th>
                    <th>OutSide U.S.</th>
                    <th>MoCa Member</th>
                    <th>MoCa Email</th>
                  </tr>
                </thead>
                <tbody bordered="true" hover="true">
                  {collectData.map((item) => (
                    <tr key={item._id}>
                      <td className="row-title">
                        {item.associate_initial ? item.associate_initial : "-"}
                      </td>
                      <td>{handleDate(item.updated_at)}</td>
                      <td>
                        {item.first_time_visitor || item.first_time_visitor > 0
                          ? item.first_time_visitor
                          : "-"}
                      </td>
                      <td>
                        {item.repeat_visitor || item.repeat_visitor > 0
                          ? item.repeat_visitor
                          : "-"}
                      </td>
                      <td>
                        {item.individual_num_youth ||
                        item.individual_num_youth > 0
                          ? item.individual_num_youth
                          : "-"}
                      </td>
                      <td>
                        {item.individual_num_teen ||
                        item.individual_num_teen > 0
                          ? item.individual_num_teen
                          : "-"}
                      </td>
                      <td>
                        {item.individual_num_college ||
                        item.individual_num_college > 0
                          ? item.individual_num_college
                          : "-"}
                      </td>
                      <td>
                        {item.individual_num_adult ||
                        item.individual_num_adult > 0
                          ? item.individual_num_adult
                          : "-"}
                      </td>
                      <td>
                        {item.individual_num_senior ||
                        item.individual_num_senior > 0
                          ? item.individual_num_senior
                          : "-"}
                      </td>
                      <td>{item.institution ? item.institution : "-"}</td>
                      <td>{item.postal_code ? item.postal_code : "-"}</td>
                      <td>{item.outside_us ? item.outside_us : "-"}</td>
                      <td>{item.moca_member ? item.moca_member : "-"}</td>
                      <td>{item.moca_email ? item.moca_email : "-"}</td>
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
        </div>
      </div>
    </Fragment>
  );
};

export default ReportPage;
