import getData from "@/API/getdata";
import renderlistimage from "./renderlistimage";

export default function content1() {
    (async () => {
        const GET_listImage = await getData({
            category: 'products',
            status: 'sale'
        });
        const GET_contentImg = await getData({
                category: ['content-img', 'slide-img']
        })
        // render - hover
        const listItemContainer = document.querySelector('#homepage .content1 .list-item-container .list-item');
        renderlistimage(GET_listImage, listItemContainer);
        //Scroll
        (() => {
            const data_content = GET_contentImg.find(item => item.name == 'Content1-Img');
            const images = document.querySelectorAll('#homepage .content1 .content1-img');
            images.forEach((img, index) => {
                img.src = data_content.galeryImage[index];
                if (index == 0) {
                    const height = window.innerHeight;
                    window.addEventListener('scroll', function () {
                        let distance = img.getBoundingClientRect().top;
                        let opc = (height - distance - 0.2 * height) / height;
                        img.style.opacity = opc;
                    })
                }
            })
        })();
        // Slide
        (() => {
            // Show img
            const slideContainer = document.querySelector('#homepage .content1 .slide .container-slide-img');
            const slideData = GET_contentImg.find(item => item.name == 'Slide-Img');
            const htmls = slideData.galeryImage.map(link => `
                <div class="slide-group">
                    <img src="${link}" alt="">
                </div>
            `)
            slideContainer.innerHTML = htmls.join('');

            // Handle
            const slideGroup = document.querySelectorAll('#homepage .content1 .slide-group');
            const dot = document.querySelectorAll('#homepage .content1 .slide .circle');
            slideGroup.forEach((slide, index) => {
                slide.style.opacity = index != 0 ? 0 : 1;
            })
            let index = 0;
            let prevIndex;
            dot[0].classList.add('active');

            function showSlide() {
                slideGroup[prevIndex].style.opacity = 0;
                slideGroup[index].style.opacity = 1;
                dot[prevIndex].classList.remove('active');
                dot[index].classList.add('active');
            }
            setInterval(() => {
                prevIndex = index++;
                index = index >= slideGroup.length ? 0 : index;
                showSlide();
            }, 4000);
            dot.forEach((item, indexDot) => {
                item.onclick = function () {
                    prevIndex = index;
                    index = indexDot;
                    showSlide();
                }
            })
        })();
    })();

    return `
        <div class="content1">
            <div class="list-item-container">
                <div class="title">BEST SELLING DENIM</div>
                <div class="list-item">
                    <!-- Js -->
                </div>
            </div>

            <div class="main-content bl-background">
                <div class="text grid-center">
                    <p>Comfort Comes in Many Styles</p>
                    <h1>OUR DENIM WILL MAKE WORKING FROM WORK FEEL JUST LIKE WORKING FROM HOME.</h1>
                    <p>I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a
                        story and let your users know a little more about you.</p>
                    <a href="/products"><button>Shop All Denim</button></a>
                </div>
                <img src="" alt="" class="content1-img">
            </div>

            <div class="main-content no-background">
                <img src="" alt="" class="img-left grid-center content1-img">
                <div class="slide">
                    <div class="container-slide-img"></div>
                    <a href="/products"><button>Shop Now</button></a>
                    <div class="dot">
                        <div class="circle"></div>
                        <div class="circle"></div>
                        <div class="circle"></div>
                    </div>
                </div>
                <div class="detail grid-center">
                    <h1 class="title">EARTH-FRIENDLY AND LASTING</h1>
                    <p>I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to tell a
                        story and let your users know a little more about you.</p>
                    <a href="/products"><button>Learn More</button></a>
                </div>
            </div>
        </div>
    `
}