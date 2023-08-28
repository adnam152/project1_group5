export default function relatedProduct(data_list, container){
    // render list 
    (() => {
        const component = data_list.map((data, index) => {
            return `
                <div class ="related-product">
                    <div class="title">
                        <h2>OTHER PRODUCTS OF THE SHOP</h2>
                        <a href="/product">See all</a>
                    </div>
                    <div class="list-products">
                        <div class="image">
                            <img src="${data.galeryImage[0]}" alt=""/>
                        </div>
                        <div class="name">${data.name}</div>
                        <div class="price">${data.price}<span class="sold">109.00$</span></div>
                    </div>
                </div>
            `
        })
        container.innerHTML = component.join('');
    })();
}