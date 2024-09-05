import axios from "axios";

const sharesUrl = "http://localhost:8080/api/shares";


const getShares = async () => {
  const res = await axios.get(sharesUrl);
  return res.data;
};

export { getShares }