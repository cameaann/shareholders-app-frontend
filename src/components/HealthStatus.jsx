import { useState, useEffect } from "react";
import { getStatus } from "../services/shareholdersService";

const HealthStatus = () =>{
    const [status, setStatus ] = useState([]);

    useEffect(() => {
        getStatus().then(res => {
            setStatus(res);
        })
        .catch((error)=>{
            console.error(error);
        })
    }, []);

    return(
        <div>
            <h1>Health Check Status:</h1>
            <h2>{status}</h2>
        </div>
    )

}

export default HealthStatus;