import home_RenderListImage from "./home_listimage";

export default function content2(data) {
    (async () => {
        const allDataContent2 = await data;
        const data_listImage = allDataContent2.filter(item => item.category == 'new' || item.category == 'new-label');

        const bg1 = document.querySelector('#homepage .content2 .bg1 img');
        const bg2 = document.querySelector('#homepage .content2 .bg2 img');
        bg1.src = allDataContent2.find(item => item.name == 'Background Content 2').galeryImage[1];
        bg2.src = allDataContent2.find(item => item.name == 'Background Content 2').galeryImage[0];

        // render - hover
        const listItemContainer = document.querySelector('#homepage .content2 .list-item-container .list-item');
        home_RenderListImage(data_listImage, listItemContainer);

        // scroll
        window.addEventListener('scroll', ()=> {
            const positionBg1 = bg1.getBoundingClientRect().top * 0.8;
            const positionBg2 = bg2.getBoundingClientRect().top * 0.8;
            bg1.style.top = -positionBg1 + 'px';
            bg2.style.top = -positionBg2 + 'px';
        });
    })();
    return `
        <div class="content2">
            <div class="bg1">
                <img src="" alt="">
                <div class="list-item-container">
                    <div class="main-content img-background">
                        <div class="text grid-center">
                            <p>We Love Denim</p>
                            <h1>OUR FAVOURITE SHORTS MADE FOR THE BEST COMFORT AND STYLE.</h1>
                            <p>I'm a paragraph. Click here to add your own text and edit me. I’m a great place for you to
                                tell a
                                story and let your users know a little more about you.</p>
                        </div>
                        <button>Shop All Denim</button>
                    </div>
                    <div class="list-item">
                        <!-- Js -->
                    </div>
                </div>
            </div>

            <div class="bg2">
                <img src="" alt="">
                <div class="main-content img-background">

                </div>
            </div>
        </div>
    `
}