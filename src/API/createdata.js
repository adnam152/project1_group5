import axios from "axios";

export default async function createData(obj){
    return await axios.post('',obj);
}