import getOneProduct from "@/API/getone";
import renameTitle from "./title";
import getData from "@/API/getdata";
import renderListImage from "./renderlistimage";
import alertMessage from "./alert";

export default function component_ProductDetail({
  id
}) {
  (async () => {
    const product = await getOneProduct(id);
    const imageDetail = document.querySelector('.container-img img');
    const imageProduct = document.querySelector('.container-img .small-img');
    const nameProduct = document.querySelector('#product-detail .infor .name ');
    const categoryProduct = document.querySelector('#sourceProductDetail .list');
    const statusProduct = document.querySelector('#sourceProductDetail .status');
    const nameProductDetail = document.querySelector('#sourceProductDetail .name');
    const priceProductDetail = document.querySelector('#product-detail .infor .priceDetail');
    // related product
    const dataRelated = await getData({
      status: product.status
    }, 5);
    const related = document.querySelector('.related-products .list-products')
    renderListImage(dataRelated, related)

    renameTitle(`Clothing Shop - ${product.name}`);
    imageDetail.src = product.galeryImage[0];
    nameProduct.innerHTML = product.name;
    nameProductDetail.textContent += product.name;
    categoryProduct.innerHTML = product.category;
    statusProduct.textContent += product.status;
    priceProductDetail.innerHTML = product.price;
    product.galeryImage.forEach(e =>
      imageProduct.innerHTML += `<img src="${e}" >`
    );
    (() => {
      const btnNext = document.querySelector('.small-img #next');
      const btnPrev = document.querySelector('.small-img #prev');
      const widthImg = document.querySelector('.small-img img').offsetWidth;
      const listImage = document.querySelectorAll('.small-img img');
      const plusBtn = document.querySelector('.form-count #plus');
      const minusBtn = document.querySelector('.form-count #minus');
      const input = document.querySelector('.form-count input');
      const container = document.querySelector('.Product-Description .Description-content');
      const allColors = document.querySelectorAll('#product-detail .flex-colum .color button');
      const allSize = document.querySelectorAll('#product-detail .flex-colum .size button');
      const addCart = document.querySelector('#product-detail .bought #add');
      const error = document.querySelector('#product-detail .infor .error');

      // size,color
      allColors.forEach(function (color) {
        color.onclick = function () {
          document.querySelector('#product-detail .flex-colum .color button.active')?.classList.remove('active');
          this.classList.add('active');
        }
      })
      allSize.forEach(function (size) {
        size.onclick = function () {
          document.querySelector('#product-detail .flex-colum .size button.active')?.classList.remove('active');
          this.classList.add('active');
        }
      })
      // render description
      container.innerHTML = `${product.description == '' ? 'There is no product description available' : product.description}`;
      // hover next, prev
      btnNext.onclick = () => {
        imageProduct.scrollLeft += widthImg;
      }
      btnPrev.onclick = () => {
        imageProduct.scrollLeft -= widthImg;
      }
      // hover image
      listImage.forEach(item => {
        item.addEventListener('mouseenter', () => {
          imageDetail.src = item.src;
          item.style.border = '3px solid var(--main-color)'
        })
        item.addEventListener('mouseleave', () => {
          item.style.border = ''
        })
      })
      //  count
      minusBtn.onclick = () => {
        const currentValue = parseInt(input.value, 10);
        if (currentValue > 1) {
          input.value = currentValue - 1
        }
      }
      plusBtn.onclick = () => {
        const currentValue = parseInt(input.value, 10);
        input.value = currentValue + 1
      }
      input.oninput = (e) => {
        const value = e.target;
        value.value = value.value.replace(/\D/g, '');
      }
      // add cart, bought
      // function checkProduct(valid) {
      //   for (let i = 0; i < valid.length; i++) {
      //     return valid[i].classList.contains('active')
      //   }
      // }
      addCart.onclick = () => {
        let tempColor = document.querySelector('#product-detail .flex-colum .color button.active');
        let tempSize = document.querySelector('#product-detail .flex-colum .size button.active');
        // if (checkProduct(allColors) && checkProduct(allSize)) {
        //   console.log('Sản phẩm đã được thêm vào giỏ hàng')
        // } 
        if(tempColor && tempSize){
          alertMessage('Success','Add successfully');
        }
        else {
          alertMessage('Fail','Please choose size and color');
        }
      }
    })()
  })();
  return `
    <div id="containerProductDetail">
    <div id="sourceProductDetail"><a href="#"> HomePage > </a><a href="/products" class="list"></a> <span class = "status"> > </span><span class = "name"> > </span></div>
    <div id="product-detail">
      <div class="container-img">
        <img src="" class="large-img" alt="">
        <div class="scrollImage">
        <div class="small-img">
        <i class="fa-solid fa-angle-left" id="prev"></i>
        <i class="fa-solid fa-chevron-right" id="next"></i>
        </div>
        </div>
      </div>
      <div class="infor">
        <div class="name"></div>
        <div class="feedback"><span>4,9 <i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i
              class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i> &ensp;|
          </span><span> &ensp;5,5k Sold</span></div>
        <div class="price"><del class="price_del">109.00$</del><span class = "priceDetail"> 69.00$</span><span class="sale">Up 20%</span></div>
        <div class="flex-colum">
          <div class="ship flex">
            <label class="category">Transport</label> <span>Free ship</span>
          </div>
          <div class="color flex">
            <label class="category">Color</label>
            <button>Grey</button>
            <button>Pink</button>
            <button>Green</button>
          </div>
          <div class="size flex">
            <label class="category">Size</label>
            <button>S</button>
            <button>M</button>
            <button>L</button>
          </div>
          <div class="count flex">
            <label class="category">Count</label>
            <div class="form-count">
              <button id ="minus"><i class="fa-solid fa-minus"></i></button>
              <input type="text" min="1" max="100" value="1" aria-valuenow="50" >
              <button id="plus"><i class="fa-solid fa-plus"></i></button>
            </div>
            <span>500 products available</span>
          </div>
        </div>
        <div class="contact">
          <div class="contact-icon">
            <i class="fa-brands fa-facebook-messenger" id="messenger"></i>
            <i class="fa-brands fa-facebook" id="facebook"></i>
            <i class="fa-brands fa-twitter" id="twitter"></i>
            <i class="fa-brands fa-instagram" id="instagram"></i>
          </div>
          <div class="contact-linked">
            <i class="fa-regular fa-heart"></i>
            Liked ( 5,1k )
          </div>
        </div>
        <div class="Customer-benefits">
          <div class="benefits-1">
            <i class="fa-solid fa-reply"></i>
            7 days free returns
          </div>
          <div class="benefits-1">
            <i class="fa-solid fa-shield"></i>
            100% genuine product
          </div>
          <div class="benefits-1">
            <i class="fa-solid fa-truck"></i>
            Free shipping
          </div>
        </div>
        <div class="error"></div>
        <div class="bought">
          <button id="add"> <i class="fa-solid fa-cart-shopping"></i> Add to cart</button>
          <button id="buy">Buy now</button>
        </div>
        
      </div>
    </div>
    <div class="Product-Description">
      <h2 class="title">Product Description</h2>
      <div class="Description-content"></div>
    </div>
    <div class="related-products">
      <div class="title">
        <h2>OTHER PRODUCTS OF THE SHOP</h2>
        <a href="/products">See all <i class="fa-solid fa-arrow-right-long"></i></a>
      </div>
      <div class="list-products"></div>
    </div>
  </div>
    `
}