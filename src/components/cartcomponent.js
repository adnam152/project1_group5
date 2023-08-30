import getData from "@/API/getdata";
import renameTitle from "./title";
import userCart from "@/API/usercart";
export default function cartPageComponent() {
    (async () => {
        renameTitle('Your cart');
        const GET_logo = await getData({
            category: 'logo'
        })
        const [logo] = GET_logo;
        const link = logo.galeryImage[0];
        const logoImg = document.querySelector('#cartPage .cart_title img');
        logoImg.src = link;

        let GET_cart = await userCart().GET();
        const carts = GET_cart.cart;
        const tableContainer = document.querySelector('#cartPage table');

        function pricing(price, quantity) {
            const regex = /\$(\d+\.\d{2})/;
            const match = price.match(regex);
            return match[1] * quantity
        }
        function renderTable(){
            carts.forEach(async (cart) => {
                let [product] = await getData({ id: cart.productId });
                let html = `
                        <tr>
                            <td><a href="/products/${cart.productId}"><img src="${product.galeryImage[0]}">${product.name}</a></td>
                            <td>${cart.color}</td>
                            <td>${cart.size}</td>
                            <td>${product.price}</td>
                            <td>${cart.quantity}</td>
                            <td>${'$' + pricing(product.price, cart.quantity)}</td>
                        </tr>
                    `
                tableContainer.innerHTML += html;
            })
        }
        renderTable(); 
    })();
    return `
        <div class="cart_title">
            <div class="image"><img src="" alt=""> </div>
            <span>YOUR CART</span> 
        </div>
        <div class="table_products">
            <table border="1">
                <tr>
                    <th>Product</th>
                    <th>Color</th>
                    <th>Size</th>
                    <th>Unit Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
            </table>
        </div>
    `
}