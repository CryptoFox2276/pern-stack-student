import React, { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const GroupPage = () => {
  const selectOption = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
    { value: "13", label: "13" },
    { value: "14", label: "14" },
    { value: "15", label: "15" },
    { value: "16", label: "16" },
    { value: "17", label: "17" },
    { value: "18", label: "18" },
    { value: "19", label: "19" },
    { value: "20", label: "20" },
  ];

  useEffect(() => {
    document.title = "Group | MOCA";
  }, []);

  const [isDisabledOutSide, setIsDisabledOutSide] = useState(true);
  const [datePicker, setDatePicker] = useState(new Date());

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

  const initState = {
    date: handleDate(new Date()),
    associate_initial: "",
    individual_num_youth: "",
    individual_num_teen: "",
    individual_num_college: "",
    individual_num_adult: "",
    individual_num_senior: "",
    institution: "",
    postal_code: "",
    outside_us: "",
  };

  const [formData, setFormData] = useState(initState);

  const {
    date,
    associate_initial,
    individual_num_youth,
    individual_num_teen,
    individual_num_college,
    individual_num_adult,
    individual_num_senior,
    institution,
    postal_code,
    outside_us,
  } = formData;

  const handleOnChange = (e, action) => {
    console.log(action.name, e.value);
    //   setFormData({ ...formData, [action.name]: e.value });
    formData[action.name] = e.value;
  };
  const handleOnChange1 = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnChangeOutSide = async (e) => {
    setFormData({ ...formData, ["outside_us"]: "" });
    setIsDisabledOutSide(!isDisabledOutSide);
  };

  const handleOnChangeDatePicker = (date) => {
    setFormData({ ...formData, ["date"]: handleDate(date) });
    setDatePicker(date);
  };

  const initFormData = () => {
    setFormData({ ...initState });
    console.log(formData);
  };

  const formValidate = () => {
    console.log(formData);
    console.log(
      date,
      associate_initial,
      individual_num_youth,
      individual_num_teen,
      individual_num_college,
      individual_num_adult,
      individual_num_senior,
      institution,
      postal_code,
      outside_us
    );
    if (
      associate_initial === "" ||
      postal_code == "" ||
      individual_num_youth == "" ||
      individual_num_teen == "" ||
      individual_num_college == "" ||
      individual_num_adult == "" ||
      individual_num_senior == "" ||
      institution == "" ||
      (!isDisabledOutSide && outside_us == "")
    ) {
      alert("Please fill essential field");
      console.log("Please fill essential field");
      return false;
    }
    return true;
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formValidate()) return;
      await fetch("/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }).then(() => {
        alert("Saved Successfully!");
        initFormData();
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <div className="container individual-page">
        <div className="pb-1 d-flex justify-content-between">
          <Link to="/">
            <Button color="bg-primary" className="px-5">
              Go Back
            </Button>
          </Link>
          <Button
            color="bg-success"
            className="px-5 bg-success success"
            onClick={handleOnSubmit}
          >
            Save
          </Button>
        </div>
        <div className="row pb-4">
          <div className="col-md-6 col-sm-12">
            <div className="row">
              <div className="col-md-6 col-lg-4"></div>
              <div className="col-md-6 col-lg-8">
                <Form.Group>
                  <Form.Label className="label-title">
                    Associate Initials
                  </Form.Label>
                  <Form.Control
                    as="input"
                    name="associate_initial"
                    value={associate_initial}
                    className="rounded-5 shadow"
                    placeholder="Your Answer"
                    onChange={handleOnChange1}
                    onClick={handleOnChange1}
                  ></Form.Control>
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="row">
              <div className="col-sm-12 col-md-6">
                <Form.Group>
                  <Form.Label className="label-title">Date</Form.Label>
                  <DatePicker
                    id="datepicker"
                    className="rounded-5 shadow form-control"
                    selected={datePicker}
                    onChange={handleOnChangeDatePicker}
                  />
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-4">
          <div className="col-md-6 col-sm-12">
            <div className="row">
              <div className="col-md-6 col-lg-4"></div>
              <div className="col-md-6 col-lg-8">
                <div>
                  <p className="label-title">Number of Individuals</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4">Youth(Ages 1 - 12)</div>
              <div className="col-md-6 col-lg-8">
                <Form.Group>
                  {/* <Form.Control
                    as="select"
                    className="rounded-5 shadow select-box"
                  >
                    <option className="d-none" value="">
                      Select a value...
                    </option>
                    {["1", "2", "3", "4", "5"].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </Form.Control> */}
                  <Select
                    name="individual_num_youth"
                    options={selectOption}
                    className="rounded-5 shadow select-box"
                    onChange={handleOnChange}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: "50px",
                      }),
                    }}
                    maxMenuHeight={200}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4">Teen(Ages 13 - 19)</div>
              <div className="col-md-6 col-lg-8">
                <Form.Group>
                  {/* <Form.Control
                    as="select"
                    className="rounded-5 shadow select-box"
                  >
                    <option className="d-none" value="">
                      Select a value...
                    </option>
                    {["1", "2", "3", "4", "5"].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </Form.Control> */}
                  <Select
                    name="individual_num_teen"
                    options={selectOption}
                    className="rounded-5 shadow select-box"
                    onChange={handleOnChange}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: "50px",
                      }),
                    }}
                    maxMenuHeight={200}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4">College</div>
              <div className="col-md-6 col-lg-8">
                <Form.Group>
                  {/* <Form.Control
                    as="select"
                    className="rounded-5 shadow select-box"
                  >
                    <option className="d-none" value="">
                      Select a value...
                    </option>
                    {["1", "2", "3", "4", "5"].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </Form.Control> */}
                  <Select
                    name="individual_num_college"
                    options={selectOption}
                    className="rounded-5 shadow select-box"
                    onChange={handleOnChange}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: "50px",
                      }),
                    }}
                    maxMenuHeight={200}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4">Adult</div>
              <div className="col-md-6 col-lg-8">
                <Form.Group>
                  {/* <Form.Control
                    as="select"
                    className="rounded-5 shadow select-box"
                  >
                    <option className="d-none" value="">
                      Select a value...
                    </option>
                    {["1", "2", "3", "4", "5"].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </Form.Control> */}
                  <Select
                    name="individual_num_adult"
                    options={selectOption}
                    className="rounded-5 shadow select-box"
                    onChange={handleOnChange}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: "50px",
                      }),
                    }}
                    maxMenuHeight={200}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4">Senior(65+)</div>
              <div className="col-md-6 col-lg-8">
                <Form.Group>
                  {/* <Form.Control
                    as="select"
                    className="rounded-5 shadow select-box"
                  >
                    <option className="d-none" value="">
                      Select a value...
                    </option>
                    {["1", "2", "3", "4", "5"].map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </Form.Control> */}
                  <Select
                    name="individual_num_senior"
                    options={selectOption}
                    className="rounded-5 shadow select-box"
                    onChange={handleOnChange}
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderRadius: "50px",
                      }),
                    }}
                    maxMenuHeight={200}
                  />
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12"></div>
        </div>
        <div className="row pb-4">
          <div className="col-md-6 col-sm-12">
            <div className="row">
              <div className="col-md-6 col-lg-4" />
              <div className="col-md-6 col-lg-8">
                <Form.Group>
                  <Form.Label className="label-title">
                    Institution for Tour or Student
                  </Form.Label>
                  <Form.Control
                    as="input"
                    name="institution"
                    value={institution}
                    className="rounded-5 shadow"
                    placeholder="Your Answer"
                    onChange={handleOnChange1}
                  ></Form.Control>
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12"></div>
        </div>
        <div className="row pb-4">
          <div className="col-md-6 col-sm-12">
            <div className="row">
              <div className="col-md-6 col-lg-4" />
              <div className="col-md-6 col-lg-8">
                <Form.Group>
                  <Form.Label className="label-title">
                    Postal Code<span>*</span>
                  </Form.Label>
                  <Form.Control
                    as="input"
                    name="postal_code"
                    value={postal_code}
                    className="rounded-5 shadow"
                    placeholder="Your Answer"
                    onChange={handleOnChange1}
                    onClick={handleOnChange1}
                  ></Form.Control>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4" />
              <div className="col-md-6 col-lg-8">
                <Form.Group>
                  <Form.Label>
                    <Form.Check
                      id="checkbox-1"
                      label="Outside the U.S."
                      onChange={handleOnChangeOutSide}
                    />
                  </Form.Label>
                  <Form.Control
                    as="input"
                    name="outside_us"
                    value={outside_us}
                    className="rounded-5 shadow"
                    placeholder="Your Answer"
                    onChange={handleOnChange1}
                    onClick={handleOnChange1}
                    disabled={isDisabledOutSide}
                  ></Form.Control>
                </Form.Group>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12"></div>
        </div>
      </div>
    </Fragment>
  );
};

export default GroupPage;
