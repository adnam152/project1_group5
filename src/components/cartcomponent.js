import getData from "@/API/getdata";
import renameTitle from "./title";
import cartUsers from "@/API/createCartUsers";
import getUser from "@/API/getusers";
export default function cartPageComponent(){
    (async() => {
        renameTitle('Your cart')
        const GET_logo = await getData({
            category: 'logo'
        })
        const [logo] = GET_logo;
        const link = logo.galeryImage[0];
        const logoImg = document.querySelector('#cartPage .cart_title img');
        logoImg.src = link;
    })();
    return `
        <div class="cart_title">
            <div class="image"><img src="" alt=""> </div>
            <span>YOUR CART</span> 
        </div>
        <div class="table_products">
            <div class="category_table">
                <ul>
                    <li>Products</li>
                    <li></li>
                    <li>Price</li>
                    <li>Count</li>
                    <li>Money</li>
                    <li>Operation</li>
                </ul>
            </div>
            <section></section>
            <div class="bill">
                Total Money (x Products): 1000$ 
                <button class="billBtn">Purchase</button>
            </div>
        
        </div>
    `
}