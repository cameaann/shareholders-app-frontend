import { useState, useEffect } from "react";
import { getShareholders } from "../services/shareholdersService";

const Shareholders = () =>{
    const [status, setStatus ] = useState([]);

    useEffect(() => {
        getShareholders().then(res => {
            setStatus(res);
        })
        .catch((error)=>{
            console.error(error);
        })
    }, []);

    return(
        <div>
            <h1>Health Check Status:</h1>
            <p>{status}</p>
        </div>
    )

}

export default Shareholders;