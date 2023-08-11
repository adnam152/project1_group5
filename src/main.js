import homepage from "./pages/homepage";
import productsPage from "./pages/allproductspage";
import notFoundPage from "./pages/notfoundpage";
import adminPage from "./pages/adminpage";
import {render, router} from "./utilities";
import axios from "axios";
import productsDetailPage from "./pages/productdetailpage";
import API_products from "./API/API_products";
import connectData from "./data/connectdata";

axios.defaults.baseURL = API_products;

router.on('/', () => render(app, homepage));
router.on('/products', () => render(app, productsPage));
router.on('/admin', () => render(app, adminPage));
router.notFound(() => render(app, notFoundPage));
router.on('/products/:id', ({data}) => render(app, () => productsDetailPage(data)));


router.resolve();