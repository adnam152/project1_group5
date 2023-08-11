import getOneProduct from "@/API/getone";
import connectData from "@/data/connectdata";
import footer from "@/components/footer";
import header from "@/components/header";
import loginForm from "@/components/login-modal";
import component_ProductDetail from "@/components/productdetail";

export default function productsDetailPage(data) {
    (async()=>{
        const product = await getOneProduct(data.id);
        
    })();

    return `
    <div id="product_detail">
        ${connectData(loginForm)}
        ${connectData(header)}
        
        ${connectData(()=>component_ProductDetail(data))}

        ${connectData(footer)}
    </div>
    `
}