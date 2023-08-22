import getOneProduct from "@/API/getone";
import renameTitle from "./title";

export default function component_ProductDetail({id}){
    (async()=>{
        const product = await getOneProduct(id);
        renameTitle(`Clothing Shop - ${product.name}`);
    })();
    return `
    
    `
}