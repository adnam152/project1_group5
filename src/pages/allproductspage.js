import getData from "@/API/getdata";
import footer from "@/components/footer";
import header from "@/components/header";
import loginForm from "@/components/login-modal";
import renderListImage from "@/components/renderlistimage";
import renameTitle from "@/components/title";
import axios from "axios";

const NUMBER_PRODUCT_OF_PAGE = 15;

export default function productsPage() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    renameTitle('Clothing Shop - All Products');
    (async function () {
        // Banner
        const [bannerImage] = await getData({
            category: 'banner',
            name: 'Banner AllproductsPage'
        });
        const bannerImage1 = document.querySelector('main#all_products .all-banner .banner-img1');
        const bannerImage2 = document.querySelector('main#all_products .all-banner .banner-img2');
        bannerImage1.src = bannerImage.galeryImage[0];
        bannerImage2.src = bannerImage.galeryImage[1];

        filter();
        // Filter
        const fillList = document.querySelectorAll('main#all_products li');
        fillList.forEach(fill => {
            fill.onclick = function () {
                if (!fill.classList.contains('active')) {
                    document.querySelector('main#all_products li.active').classList.remove('active');
                    fill.classList.add('active');
                    scroll();
                    filter();
                }
            }
        })
        function filter() {
            const fillActive = document.querySelector('main#all_products li.active');
            const dataFilter = fillActive.getAttribute('data-filter');
            let params = {
                category: 'products'
            };
            switch (dataFilter) {
                case 'new':
                    params = {
                        category: 'products',
                        status: ['new', 'new arrival']
                    }
                    break;
                case 'sale':
                    params = {
                        category: 'products',
                        status: 'sale'
                    }
                    break;
                case 'other':
                    params = {
                        category: 'products',
                        status: ''
                    }
                    break;
            }
            paginate(params);
        }
        // Paginate
        async function paginate(params) {
            const { headers } = await axios.get('?_limit=1&_page=1&_meta=count', {
                params: params
            })
            const COUNT_allProducts = headers['x-total-count'];
            const numberOfPage = Math.ceil(COUNT_allProducts / NUMBER_PRODUCT_OF_PAGE);
            const paginateContainer = document.querySelector('main#all_products .paging');
            let htmls = '';
            for (let i = 1; i <= numberOfPage; i++) {
                htmls += `
                    <button class="${i == 1 ? 'active' : ''}" data-page="${i}">${i}</button>
                `
            }
            paginateContainer.innerHTML = htmls;
            render(params, document.querySelector('main#all_products .paging button.active').getAttribute('data-page'));

            const allBtnPage = document.querySelectorAll('main#all_products .paging button');
            allBtnPage.forEach(btn => {
                btn.onclick = function () {
                    if (!btn.classList.contains('active')) {
                        document.querySelector('main#all_products .paging button.active').classList.remove('active');
                        btn.classList.add('active');
                        const dataPage = btn.getAttribute('data-page');
                        scroll();
                        render(params, dataPage);
                    }
                }
            })
        }
        // Render
        async function render(params, page) {
            const GET_allProducts = await axios.get(`?_page=${page}&_limit=${NUMBER_PRODUCT_OF_PAGE}`, {
                params: params
            });
            const allProducts = GET_allProducts.data;
            const container = document.querySelector('main#all_products .list-products');
            renderListImage(allProducts, container);
        }

        // Scroll
        function scroll() {
            const mainContainer = document.querySelector('main#all_products');
            mainContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

    })();
    return `
        ${loginForm()}
        ${header()}
        <main id="all_products">
            <div class="all-banner">
                <div class="text">
                    <div>
                    <h1>SHOP MEN</h1>
                    <p>I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a story and
                        let your users know a little more about you.</p>
                    </div>
                </div>
                <img src="" class="banner-img1" alt="">
                <div class="img">
                    <img src="" class="banner-img2" alt="">
                    <div class="label">
                    <p>
                        GET 25% OFF MENS DENIM JACKETS. <br>
                        USE CODE: BTTRJCKTS
                    </p>
                    <h2 class="discount">DISCOUNT</h2>
                    </div>
                </div>
            </div>
            <div class="content">
            <div class="filter">
                <h2>Filter By</h2>
                <hr>
                <ul>
                    <li class="all active" data-filter="all">All</li>
                    <li class="new" data-filter="new">New</li>
                    <li class="sale" data-filter="sale">Sale</li>
                    <li class="sale" data-filter="other">Other</li>
                </ul>
            </div>
            <div class="products-container">
                <div class="list-products"></div>

                <div class="paging"></div>
            </div>
            </div>
        </main>
        ${footer()}
    `
}