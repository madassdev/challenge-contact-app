import React from "react";

function Spinner({ src }) {
    return <img src={src || "/images/Spinner.svg"} />;
}

export default Spinner;
