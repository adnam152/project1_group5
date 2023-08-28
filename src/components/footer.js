import getData from "@/API/getdata";

export default function footer(){
    (async()=>{
        const GET_logo = await getData({
            category: 'logo'
        })
        const [logo] = GET_logo;
        const img = document.querySelector('footer .cpyright img');
        img.src = logo.galeryImage[0];
    })();
    return `
        <footer>
            <div class="container-social">
                <a href="https://www.instagram.com/" target="_blank">instagram</a>
                <a href="https://www.tiktok.com/" target="_blank">tiktok</a>
                <a href="https://www.pinterest.com/" target="_blank">PINTEREST</a>
            </div>
            <div class="container-list">
                <div class="footer-list-item">
                    <div class="title">HEADQUARTERS</div>
                    <p>500 Terry Francine Street</p>
                    <p>San Francisco, CA 94158</p>
                    <p>info@mysite.com</p>
                    <p>123-456-7890</p>
                </div>
                <div class="footer-list-item">
                    <div class="title">MENU</div>
                    <p>Shop All</p>
                    <p>Women</p>
                    <p>Men</p>
                    <p>Accessories</p>
                    <p>Discover</p>
                    <p>Clearance</p>
                </div>
                <div class="footer-list-item">
                    <div class="title">POLICY</div>
                    <p>Shipping & Returns</p>
                    <p>Store Policy</p>
                    <p>Payment Methods</p>
                    <p>FAQ</p>
                    <p>Contact</p>
                </div>
                <div class="footer-list-item">
                    <p>Join Our Mailing List</p>
                    <div class="title">GET 15% OFF AND ENJOY SALES PERKS ON YOUR FIRST ORDER.</div>
                    <p>Email Address *</p>
                    <div class="email">
                        <input type="text">
                        <button>Submit</button>
                    </div>
                </div>
                <div class="footer-list-item">
                    <div class="title">SOCIAL</div>
                    <p>Twitter</p>
                    <p>Instagram</p>
                    <p>Facebook</p>
                    <p>Pinterest</p>
                    <p>TikTok</p>
                </div>
            </div>
            <div class="container-pay">
                <div class="title">WE ACCEPT THE FOLLOWING PAYMENT METHODS</div>
                <div class="list-pay">
                    <img src="https://static.wixstatic.com/media/84770f_b4fcf701005245968d84419ae770bab6~mv2.png/v1/fill/w_63,h_39,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/Visa.png" alt="">
                    <img src="https://static.wixstatic.com/media/84770f_5c1569bf11c346d7ad76130e6a030d66~mv2.png/v1/fill/w_63,h_40,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/MasterCard.png" alt="">
                    <img src="https://static.wixstatic.com/media/84770f_e3867e3965fb439aa597381ebf0738c2~mv2.png/v1/fill/w_53,h_40,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/JCB.png" alt="">
                    <img src="https://static.wixstatic.com/media/84770f_a967a677a62f43cf8d0089e767a2efa5~mv2.png/v1/fill/w_64,h_40,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/PayPal.png" alt="">
                </div>
            </div>
            <div class="cpyright">
                <p>© 2035 by TuanNam Powered and secured by Group 2</p>
                <img src="" alt="">
            </div>
        </footer>
    `
}