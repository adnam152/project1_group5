import getOneProduct from "@/API/getone";

export default function component_ProductDetail({id}){
    (async()=>{
        const product = await getOneProduct(id);
        console.log(product)
    })();
    return `
    
    `
}