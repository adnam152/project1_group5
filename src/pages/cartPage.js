import cartPageComponent from "@/components/cartcomponent";
import footer from "@/components/footer";
import header from "@/components/header";
import loginForm from "@/components/login-modal";

export default function cartPage() {


    return `
    ${loginForm()}
    ${header()}
    <main id="cartPage">
        ${cartPageComponent()}
    </main>
    ${footer()}
    `
}