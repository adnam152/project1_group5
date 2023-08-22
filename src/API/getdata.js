import axios from "axios";

export default async function getData(params, limit = ''){
    let data = await axios.get(`?${limit}`,{
        params : params
    });
    return data.data;
}