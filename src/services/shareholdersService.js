import axios from 'axios';

const healthUrl = "https://shareholderscontainer.livelyrock-36ef92b3.germanywestcentral.azurecontainerapps.io/health";
const shareHoldersUrl = "https://shareholderscontainer.livelyrock-36ef92b3.germanywestcentral.azurecontainerapps.io/api/shareholders";

const devUrl = "http://localhost:8080/health";
const shareHoldersUrlDev = "http://localhost:8080/api/shareholders";



const getStatus = async () =>{
    const res = await axios.get(healthUrl);
    return res.data;
}

const getShareholders = async () =>{
    const res = await axios.get(shareHoldersUrl);
    return res.data;
}

export { getShareholders, getStatus}