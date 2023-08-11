import axios from "axios";

export default async function deleteData(id){
    return await axios.delete(`/${id}`);
}