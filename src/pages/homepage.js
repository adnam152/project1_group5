import content1 from "@/components/content1";
import content2 from "@/components/content2";
import header from "@/components/header";
import footer from "@/components/footer";
import loginForm from "@/components/login-modal";
import banner from "@/components/banner";
import renameTitle from "@/components/title";

export default function homepage(){
    renameTitle('Clothing Shop');
    return `
        <div id="homepage">
            ${loginForm()}
            ${header()}
            <main>
                ${banner()}
                ${content1()}
                ${content2()}
            </main>
            ${footer()}
        </div>
    `
}