import getData from "@/API/getdata";
import storage from "@/data/localstorage";

export default function header() {
    const currentUser = storage.GET_localstorage();
    let length = 0;
    if(currentUser){
        length = currentUser.cart.length
    }
    (async () => {
        const GET_logo = await getData({
            category: 'logo'
        })
        const [logo] = GET_logo;
        const link = logo.galeryImage[0];
        const logoImg = document.querySelector('.header_logo img');
        logoImg.src = link;
        // Login Formasd
        if (!currentUser) {
            const userBtn = document.querySelector('header .header_left_Log-in .unloged');
            const formContainer = document.querySelector('#form-modal');
            userBtn.onclick = function () {
                formContainer.classList.add('show');
            }
            formContainer.onclick = function () {
                formContainer.classList.remove('show');
            }
            formContainer.querySelector('.container').onclick = function (e) {
                e.stopPropagation();
            }
        }
        //Log out
        else{
            const logoutBtn = document.querySelector('header .header_left_Log-in .logout');
            logoutBtn.onclick = function () {
                storage.REMOVE_localstorage();
                location.reload();
            }
        }
    })();
    return `
        <header>
            <div class="header_left">
            <div class="header_left_Log-in">
            
            ${currentUser ? `
                <div class="loged">
                    <i class="fa-solid fa-circle-user"></i>
                    <span>${currentUser.username}</span>
                        <div class="user-manager">
                            ${currentUser.username == 'administrator'? `
                            <a href='/admin'><div class='option'>Manager</div></a>
                            `:`
                            <div class="option">Profile</div>
                            `}
                            <div class="option logout">Log out</div>
                        </div>
                </div>
                ` : `
                <div class="unloged">
                    <i class="fa-solid fa-circle-user"></i>
                    <span>Login</span>
                </div>
                `}
                                
            </div>
            <div class="header_left_location">
                <i class="fa-solid fa-location-dot"></i>
                <span>Locations</span>
            </div>
            </div>
            <div class="header_logo">
            <a href="/"><img src="" alt=""></a>
            </div>
            <div class="header_right">
            <ul class="header_right_parents-menu">
                <li><div class="title">Women</div>
                    <ul class="header_right_children-menu">
                    <a href="/products"><li class="option">Women's New Arrivals</li></a>
                    <a href="/products"><li class="option">Women's Best Sellers</li></a>
                    <a href="/products"><li class="option">Women's Jeans</li></a>
                    <a href="/products"><li class="option">Women's Shorts</li></a>
                    <a href="/products"><li class="option">Women's Jackets</li></a>
                    <a href="/products"><li class="option">Skirts</li></a>
                    </ul>
                </li>
                <li><div class="title">Men</div>
                    <ul class="header_right_children-menu">
                    <a href="/products"><li class="option">Men's New Arrivals</li></a>
                    <a href="/products"><li class="option">Men's Best Sellers</li></a>
                    <a href="/products"><li class="option">Men's Jeans</li></a>
                    <a href="/products"><li class="option">Men's Shorts</li></a>
                    <a href="/products"><li class="option">Men's Jackets</li></a>
                    </ul>
                </li>
                <a href="/products"><li><div class="title">Accessories</div></li></a>
                <a href="/products"><li><div class="title">Discover</div></li></a>
                <a href="/products"><li><div class="title">Clearance</div></li></a>
            </ul>
            </div>
            <div class="header_absolute_left">
            25% OFF WOMENS JEANS - USE CODE: BTTRDAYS
            </div>
            <div class="header_absolute_right">
            <div class="header_absolute_right_search">
                <input type="text" placeholder="Search...">
                <button type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
            </div>
            <div class="header_absolute_right_hearth">
                <i class="fa-solid fa-heart"></i>
                <span>Wishlist</span>
            </div>
            <div class="header_absolute_right_cart">
                <a href="/cart">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span class="quantity">${length}</span>
                </a>
            </div>
            </div>
        </header>
    `
}

