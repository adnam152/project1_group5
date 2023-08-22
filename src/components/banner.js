import getData from "@/API/getdata";

export default function banner() {
    (async () => {
        const GET_img = await getData({
            category: 'banner'
        })
        const bannerImg = GET_img.find(item => item.name == 'Banner HomePage').galeryImage;
        const bannerIcon = GET_img.find(item => item.name == 'Banner Icon').galeryImage;
        const bannerBox = document.querySelector('.banner');
        const imgLeft = bannerBox.querySelector('.img-left img');
        const imgRight = bannerBox.querySelector('.img-right img');
        const icon = bannerBox.querySelector('.label img');
        
        imgLeft.src = bannerImg[0];
        imgRight.src = bannerImg[1];
        icon.src = bannerIcon[0];
        window.addEventListener('scroll', () => {
            let topDistance = bannerBox.getBoundingClientRect().top - 130;
            const windowHeight = window.innerHeight;
            imgLeft.style.right = (topDistance / windowHeight) * 9 + 20 + '%';
            imgRight.style.left = (topDistance / windowHeight) * 9 + '%'
        })
    })();
    return `
        <div class="banner">
            <div class="img-left img">
                <img src="" alt="">
            </div>
            <div class="img-right img">
                <img src="" alt="">  
            </div>
            <div class="label">
                <img src="" alt="">
                <a href="/products"><button>Shop Women</button></a>
                <span class="text">
                    <h1>GOODBYE SWEATS, HELLO DENIM</h1>
                    <p>Better days are coming, take them on in style.</p>
                </span>
                <a href="/products"><button>Shop Men</button></a>
            </div>
        </div>
    `
}