import axios from "axios";
import API_user from "./API_user";

export default async function getUser(username, password){
    let data = await axios.get(API_user, {
        params:{
            username,
            password
        }
    });
    return data.data;
}