import React, { Fragment, useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
// import DatePicker from 'react-16-bootstrap-date-picker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const IndividualPage = () => {
  const selectOption = [
    { value: "", label: "Select..." },
    { value: "0", label: "0" },
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

  const [isDisabledOutSide, setIsDisabledOutSide] = useState(true);
  const [isDisabledMoCaMember, setIsDisabledMoCaMember] = useState(true);
  const [datePicker, setDatePicker] = useState(new Date());

  useEffect(() => {
    document.title = "Individual | MOCA";
  }, []);

  // const splitDate = (str) => {
  //   let date = new Date(str),
  //     year = date.getFullYear(),
  //     month = date.getMonth() + 1,
  //     m = ("0" + month.toString()).substr(-2),
  //     dt = date.getDate(),
  //     d = ("0" + dt.toString()).substr(-2);
  //   return { date: [year, m, d] };
  // };

  // const handleDate = (str) => {
  //   let datetime = splitDate(str);
  //   return datetime.date.join("-");
  // };

  const initState = {
    date: (new Date()),
    associate_initial: "",
    individual_num_youth: "",
    individual_num_teen: "",
    individual_num_college: "",
    individual_num_adult: "",
    individual_num_senior: "",
    first_time_visitor: "",
    repeat_visitor: "",
    postal_code: "",
    outside_us: "",
    moca_member: "",
    moca_email: "",
    collect_type: "individual",
    institution: "",
  }

  const [formData, setFormData] = useState(initState);

  const {
    date,
    associate_initial,
    individual_num_youth,
    individual_num_teen,
    individual_num_college,
    individual_num_adult,
    individual_num_senior,
    first_time_visitor,
    repeat_visitor,
    postal_code,
    outside_us,
    moca_member,
    moca_email,
    collect_type,
    institution,
  } = formData;

  const handleOnChange = (e, action) => {
    formData[action.name] = e.value;
  };
  const handleOnChange1 = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnChangeOutSide = async (e) => {
    setFormData({ ...formData, ["outside_us"]: "" });
    setIsDisabledOutSide(!isDisabledOutSide);
  };

  const handleOnChangeMoCaMember = async (e) => {
    setFormData({ ...formData, ["moca_member"]: "" });
    setIsDisabledMoCaMember(!isDisabledMoCaMember);
  };

  const handleOnChangeDatePicker = (date) => {
    setFormData({ ...formData, ["date"]: new Date(date) });
    setDatePicker(date);
  };

  const initFormData = () => {
    setFormData({ ...initState });
    console.log(formData);
  };

  const formValidate = () => {
    if (
      associate_initial === "" ||
      postal_code === "" ||
      individual_num_youth === "" ||
      individual_num_teen === "" ||
      individual_num_college === "" ||
      individual_num_adult === "" ||
      individual_num_senior === "" ||
      first_time_visitor === "" ||
      repeat_visitor === "" ||
      (!isDisabledOutSide && outside_us === "") ||
      (!isDisabledMoCaMember && moca_member === "") ||
      moca_email === ""
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
      await fetch("/collects", {
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
                    Associate Initials <span>*</span>
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
                    name="date"
                    value={date}
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
          <div className="col-md-6 col-sm-12">
            <div className="row">
              <div className="col-md-6 col-lg-4"></div>
              <div className="col-md-6 col-lg-8">
                <div>
                  <p className="label-title">First time / Repeat Status</p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-4">First Time Visitor</div>
              <div className="col-md-6 col-lg-8">
                <Form.Group>
                  <Select
                    name="first_time_visitor"
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
              <div className="col-md-6 col-lg-4">Repeat Visitor</div>
              <div className="col-md-6 col-lg-8">
                <Form.Group>
                  <Select
                    name="repeat_visitor"
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
        </div>
        <div className="row pb-4">
          <div className="col-md-6">
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
          <div className="col-md-6 col-sm-12">
            <div className="row">
              <div className="col-md-6 col-lg-4" />
              <div className="col-md-6 col-lg-8">
                <Form.Group>
                  <Form.Label className="label-title">MoCa Member</Form.Label>
                  <Form.Check
                    id="checkbox-2"
                    label="Is MoCa Member?"
                    onChange={handleOnChangeMoCaMember}
                  />
                  <Form.Control
                    as="input"
                    name="moca_member"
                    value={moca_member}
                    className="rounded-5 shadow"
                    placeholder="Your Answer"
                    onChange={handleOnChange1}
                    onClick={handleOnChange1}
                    disabled={isDisabledMoCaMember}
                  ></Form.Control>
                </Form.Group>
              </div>
            </div>
          </div>
        </div>
        <div className="row pb-4">
          <div className="col-md-6 col-sm-12">
            <div className="row">
              <div className="col-md-6 col-lg-4" />
              <div className="col-md-6 col-lg-8">
                <Form.Group>
                  <Form.Label className="label-title">
                    MoCa is conducting a digital Visitor Satisfaction Survey,
                    would you like to provide an email?
                  </Form.Label>
                  <Form.Control
                    as="input"
                    name="moca_email"
                    value={moca_email}
                    className="rounded-5 shadow"
                    placeholder="Your Answer"
                    onChange={handleOnChange1}
                    onClick={handleOnChange1}
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

export default IndividualPage;
