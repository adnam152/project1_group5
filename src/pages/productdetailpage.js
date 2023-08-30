import footer from "@/components/footer";
import header from "@/components/header";
import loginForm from "@/components/login-modal";
import component_ProductDetail from "@/components/component_productdetail";

export default function productsDetailPage(data) {

    return `
    <div id="product_detail">
        ${loginForm()}
        ${header()}
        ${component_ProductDetail(data)}
        ${footer()}
    </div>
    `
}