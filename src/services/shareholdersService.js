import axios from 'axios';

const devUrl = "http://localhost:8080/health";
const shareHoldersUrl = "/shareholders";

const getStatus = async () =>{
    const res = await axios.get(devUrl);
    return res.data;
}

const getShareholders = async () =>{
    const res = await axios.get(shareHoldersUrl);
    return res.data;
}

export { getShareholders, getStatus}