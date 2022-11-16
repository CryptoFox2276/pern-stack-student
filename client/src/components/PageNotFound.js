import React, { Fragment } from "react";
import PageNotFoundImage from "./404_error.png"
const PageNotFound = () => {
    return (
        <Fragment>
            <div>
                <img src={PageNotFoundImage} alt="PageNotFoundImage" className="w-100" />
            </div>
        </Fragment>
    )
}

export default PageNotFound;