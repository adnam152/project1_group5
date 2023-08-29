export default function relatedProduct(data_list, container){
    // render list 
    (() => {
        const component = data_list.map((data, index) => {
            return `
                <div class ="related-product">
                    
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