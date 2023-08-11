import content1 from "@/components/content1";
import content2 from "@/components/content2";
import header from "@/components/header";
import footer from "@/components/footer";
import connectData from "@/data/connectdata";
import loginForm from "@/components/login-modal";

export default function homepage(){
    return `
        <div id="homepage">
            ${connectData(loginForm,{
                name : 'Form Image'
            })}
            ${connectData(header,{
                category: 'logo'
            })}
            ${connectData(content1)}
            ${connectData(content2)}
            ${connectData(footer,{
                category: 'logo'
            })}
        </div>
    `
}