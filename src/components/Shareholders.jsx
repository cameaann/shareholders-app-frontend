import { useState, useEffect } from "react";
import { getShareholders } from "../services/shareholdersService";

const Shareholders = () =>{
    const [shareholdersList, setShareholders ] = useState([]);

    useEffect(() => {
        getShareholders().then(res => {
            setShareholders(res);
        })
        .catch((error)=>{
            console.error(error);
        })
    }, []);

    return(
        <div>
            <h1>List of shareholders:</h1>
            <ul>{shareholdersList. map(x => <li key={x.id}>{x}</li>)}</ul>
        </div>
    )

}

export default Shareholders;