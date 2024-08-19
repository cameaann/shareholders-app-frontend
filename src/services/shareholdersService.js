import axios from 'axios';

const url = "http://localhost:8080/health";
const shareHoldersUrl = "http://localhost:8080/shareholders";

const getStatus = async () =>{
    const res = await axios.get(url);
    return res.data;
}

const getShareholders = async () =>{
    const res = await axios.get(shareHoldersUrl);
    return res.data;
}

export { getShareholders, getStatus}