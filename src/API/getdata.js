import axios from "axios";

export default async function getData(params, limit = ''){
    let data = await axios.get(`?_limit=${limit}`,{
        params : params
    });
    return data.data;
}