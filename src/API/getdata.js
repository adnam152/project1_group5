import axios from "axios";

export default async function getData(params){
    let data = await axios.get('',{
        params : params
    });
    return data.data;
}