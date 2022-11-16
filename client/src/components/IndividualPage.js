import React, { Fragment, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const IndividualPage = () => {
    useEffect(()=>{
        document.title = "Individual | MOCA";
    },[]);
    return (
        <Fragment>
            <div className="container individual-page">
                <div className="pb-1">
                    <Link to="/"><Button color="bg-primary" className="px-5">Go Back</Button></Link>
                </div>
                <div className="row pb-4">
                    <div className="col-md-6 col-sm-12">
                        <div className="row">
                            <div className="col-md-6 col-lg-4"></div>
                            <div className="col-md-6 col-lg-8">
                                <Form.Group>
                                    <Form.Label className="label-title">Associate Initials</Form.Label>
                                    <Form.Control as="input" className="rounded-5 shadow" placeholder="Your Answer"></Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12"></div>
                </div>
                <div className="row pb-4">
                    <div className="col-6">
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
                                    <Form.Control as="select" className="rounded-5 shadow select-box">
                                        <option className="d-none" value="">
                                            Select a value...
                                        </option>
                                        {["1", "2", "3", "4", "5"].map(option => (
                                            <option key={option}>{option}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-4">Teen(Ages 13 - 19)</div>
                            <div className="col-md-6 col-lg-8">
                                <Form.Group>
                                    <Form.Control as="select" className="rounded-5 shadow select-box">
                                        <option className="d-none" value="">
                                            Select a value...
                                        </option>
                                        {["1", "2", "3", "4", "5"].map(option => (
                                            <option key={option}>{option}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-4">College</div>
                            <div className="col-md-6 col-lg-8">
                                <Form.Group>
                                    <Form.Control as="select" className="rounded-5 shadow select-box">
                                        <option className="d-none" value="">
                                            Select a value...
                                        </option>
                                        {["1", "2", "3", "4", "5"].map(option => (
                                            <option key={option}>{option}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-4">Adult</div>
                            <div className="col-md-6 col-lg-8">
                                <Form.Group>
                                    <Form.Control as="select" className="rounded-5 shadow select-box">
                                        <option className="d-none" value="">
                                            Select a value...
                                        </option>
                                        {["1", "2", "3", "4", "5"].map(option => (
                                            <option key={option}>{option}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-4">Senior(65+)</div>
                            <div className="col-md-6 col-lg-8">
                                <Form.Group>
                                    <Form.Control as="select" className="rounded-5 shadow select-box">
                                        <option className="d-none" value="">
                                            Select a value...
                                        </option>
                                        {["1", "2", "3", "4", "5"].map(option => (
                                            <option key={option}>{option}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
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
                                    <Form.Control as="select" className="rounded-5 shadow select-box">
                                        <option className="d-none" value="">
                                            Select a value...
                                        </option>
                                        {["1", "2", "3", "4", "5"].map(option => (
                                            <option key={option}>{option}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 col-lg-4">Repeat Visitor</div>
                            <div className="col-md-6 col-lg-8">
                                <Form.Group>
                                    <Form.Control as="select" className="rounded-5 shadow select-box">
                                        <option className="d-none" value="">
                                            Select a value...
                                        </option>
                                        {["1", "2", "3", "4", "5"].map(option => (
                                            <option key={option}>{option}</option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row pb-4">
                    <div className="col-6">
                        <div className="row">
                            <div className="col-md-6 col-lg-4" />
                            <div className="col-md-6 col-lg-8">
                                <Form.Group>
                                    <Form.Label className="label-title">Postal Code<span>*</span></Form.Label>
                                    <Form.Control as="input" className="rounded-5 shadow" placeholder="Your Answer"></Form.Control>
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
                                        />
                                    </Form.Label>
                                    <Form.Control as="input" className="rounded-5 shadow" placeholder="Your Answer"></Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="row">
                            <div className="col-md-6 col-lg-4" />
                            <div className="col-md-6 col-lg-8">
                                <Form.Group>
                                    <Form.Label className="label-title">MoCa Member</Form.Label>
                                    <Form.Control as="input" className="rounded-5 shadow" placeholder="Your Answer"></Form.Control>
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
                                    <Form.Label className="label-title">MoCa is conducting a digital Visitor Satisfaction Survey, would you like to provide an email?</Form.Label>
                                    <Form.Control as="input" className="rounded-5 shadow" placeholder="Your Answer"></Form.Control>
                                </Form.Group>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default IndividualPage;