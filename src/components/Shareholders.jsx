import { useState, useEffect } from "react";
import { getShareholders } from "../services/shareholdersService";


const initialData = [{id:'bhsd5', name: "Alex"}, {id:'bhso9', name: "Kristofer"}, {id:'jj2o9', name: "Alexander"}];
const Shareholders = () =>{
    const [shareholdersList, setShareholders ] = useState(initialData);

    useEffect(() => {
        getShareholders().then(res => {
            if (Array.isArray(res)) {
                setShareholders(res);
            }
        })
        .catch((error)=>{
            console.error(error);
        })
    }, []);

    return(
        <div>
            <h1>List of shareholders:</h1>
            <ul>{shareholdersList.map(person => <li key={person.id}>{person.name}</li>)}</ul>
        </div>
    )

}

export default Shareholders;