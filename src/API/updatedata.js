    import axios from "axios";

export default async function updateData(id, obj){
    return await axios.put(`/${id}`,obj);
}