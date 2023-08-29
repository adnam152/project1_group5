import axios from "axios";
import API_user from "./API_user";

export default async function createCartUsers(productId, propertyName) {
    const response = await axios.patch(API_user/productId, propertyName);
    return response.data;
}