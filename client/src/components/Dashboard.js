import React, { Fragment } from "react";
import { Link } from "react-router-dom";


const Dashboard = () => {
    return (
        <Fragment>
            <div className="container text-center dashboard">
                <div className="d-flex m-auto title">
                    <h1 className="bg-primary d-flex m-auto">MOCA Visitation Data Collection System</h1>
                </div>
                <div>
                    <Link to="/individual">
                        <button className="button">Individual</button>
                    </Link>
                </div>
                <div>
                    <Link to="/group"><button className="button">Group</button></Link>
                </div>
                <div>
                    <Link to="/report"><button className="button">Report</button></Link>
                </div>
            </div>
        </Fragment>
    )
};

export default Dashboard;