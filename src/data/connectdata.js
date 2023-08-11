import getData from "@/API/getdata";

export default function connectData(component, params){
    return component(getData(params))
}