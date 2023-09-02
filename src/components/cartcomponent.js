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
        const tbody = document.querySelector('#cartPage table').querySelector('tbody');

        function getPrice(price) {
            const regex = /\$(\d+\.\d{2})/;
            const match = price.match(regex);
            return parseFloat(match[1]);
        }
        function totalPrice() {
            const totalBox = document.querySelector('table .total-price');
            const moneys = tbody.querySelectorAll('.money');
            let currentValue = 0;

            moneys.forEach(money => {
                let tempMoney = money.getAttribute('data-money');
                currentValue += parseFloat(tempMoney);
            })
            totalBox.innerHTML = currentValue
        }
        function renderTable() {
            tbody.innerHTML = '';
            carts.forEach(async (cart) => {
                let [product] = await getData({ id: cart.productId });
                let money = getPrice(product.price) * cart.quantity;
                tbody.innerHTML += `
                        <tr data-productId="${cart.productId}">
                            <td><a href="/products/${cart.productId}"><img src="${product.galeryImage[0]}">${product.name}</a></td>
                            <td data-color="${cart.color}" class="color">${cart.color}</td>
                            <td data-size="${cart.size}" class="size">${cart.size}</td>
                            <td data-price="${product.price}" class="price">${product.price}</td>
                            <td><span class="reduce">-</span><input type="number" readonly value="${cart.quantity}" class="quantity"><span class="increase">+</span></td>
                            <td>$<span class="money" data-money="${money}">${money}</span></td>
                            <td><button class="del">X</button></td>
                        </tr>
                    `
                totalPrice();
            })
        }
        renderTable();
        tbody.onclick = async function (e) {
            const thisNode = e.target;
            const thisRow = thisNode.closest('tr');
            if (thisNode.className === 'del') {
                const productId = thisNode.closest('tr').getAttribute('data-productId');
                let temp = await userCart().REMOVE(productId);
                thisRow.remove();
                totalPrice();
            }
            function updateQuantity(quantity) {
                const productId = thisRow.getAttribute('data-productId');
                const color = thisRow.querySelector('.color').getAttribute('data-color');
                const size = thisRow.querySelector('.size').getAttribute('data-size');
                let product = {
                    productId,
                    color,
                    size,
                    quantity
                }
                userCart().SET(product, 'update');
                
                const price = getPrice(thisRow.querySelector('.price').getAttribute('data-price'));
                const moneyElement = thisRow.querySelector('.money');
                moneyElement.setAttribute('data-money',price*quantity);
                moneyElement.innerHTML = price*quantity;
                totalPrice();
            }
            if (thisNode.className == 'reduce') {
                const quantity = thisRow.querySelector('.quantity');
                let quantityValue = parseInt(quantity.value);
                if (quantityValue > 1) {
                    quantityValue--;
                    quantity.value = quantityValue;
                    updateQuantity(quantityValue);
                };
            }
            if (thisNode.className == 'increase') {
                const quantity = thisRow.querySelector('.quantity');
                let quantityValue = parseInt(quantity.value);
                quantityValue++;
                quantity.value = quantityValue;
                updateQuantity(quantityValue);
            }
        }
    })();

    return `
        <div class="cart_title">
            <div class="image"><img src="" alt=""> </div>
            <span>YOUR CART</span> 
        </div>
        <div class="table_products">
            <table border="1">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Color</th>
                        <th>Size</th>
                        <th>Unit Price</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody></tbody>
                <tr>
                    <td><b>Total Price</b></td>
                    <td colspan=6>$<span class="total-price">0</span></td>
                </tr>
            </table>
        </div>
    `
}