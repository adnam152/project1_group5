import axios from "axios";

export default async function getOneProduct(id){
    let data = await axios.get(`/${id}`);
    return data.data;
}

