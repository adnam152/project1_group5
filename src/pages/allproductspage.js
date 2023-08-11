import footer from "@/components/footer";
import header from "@/components/header";
import loginForm from "@/components/login-modal";
import connectData from "@/data/connectdata";

export default function productsPage() {
    return `
    <div id="all_products">
    ${connectData(loginForm)}
    ${connectData(header)}

    ${connectData(footer)}
    </div>
    `
}