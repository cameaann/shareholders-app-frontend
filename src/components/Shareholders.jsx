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
            <ul>{shareholdersList. map(person => <li key={person.id}>{person.name}</li>)}</ul>
        </div>
    )

}

export default Shareholders;