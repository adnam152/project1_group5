import axios from "axios";
import API_user from "./API_user";

export default async function addUser(data){
    const temp = await axios.post(API_user,data);
    return temp;
}