import React from "react";

import { useParams } from "react-router";

const Athlete = () => {

    const { id } = useParams();
    console.log(location);

    return (
        <p>Athlete: {id}</p>
    )
}

export default Athlete;