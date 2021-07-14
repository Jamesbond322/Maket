const productBtn = document.querySelectorAll('.buy');
const cartProductList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.fullprice');
let price = 0;


const randomId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const priceWithoutSpaces = (str) => {
    return str.replace( /\s/g, '');
};

const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1');
};

const plusFullPrice = (currentPrice) => {
    return price += currentPrice;
};

const minusFullPrice = (currentPrice) => {
    return price -= currentPrice;
};

const printFullPrice= () => {
    fullPrice.textContent = `${normalPrice(price)} сум`;
};

const printQuantity = () => {
    let length = cartProductList.querySelector('.cart-content__list').children.length;
    cartQuantity.textContent = length;
    length > 0 ? cart.classList.add('active') : cart.classList.remove('active')
};

const generateCartProduct =(img, title, price, id ) =>{
    return `
    <li class="cart-content__item">
                    <article class="cart-content__product cart-product data-id=${id}">
                      <img src="${img}" alt="" class="cart-product__img">
                      <div class="cart-product__text">
                        <h2 class="cart-product__title">${title}</h2>
                        <span class="cart-product__price">${price} сум</span>
                      </div>
                      <button class="cart-product__delete"><i class="fad fa-trash-alt"></i></button>
                    </article>
                  </li>
    
                  ` ;
}

productBtn.forEach(el => {
    el.closest('.menu_card') .setAttribute('data-id', randomId());
    el.addEventListener('click', (e)=>{
        let self = e.currentTarget;
        let parent = self.closest('.menu_card');
        let id = parent.dataset.id;
        let img = parent.querySelector('.img_pizza').getAttribute('src');
        let title = parent.querySelector('.pizza_title').textContent;
        // let priceString = parent.querySelector('.menu-price__current').textContent;
        // console.log(price);
        let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.menu-price__current').textContent))
        
        
        plusFullPrice(priceNumber);
        console.log(price);
       printFullPrice();
       cartProductList.querySelector('.cart-content__list').insertAdjacentHTML('afterbegin', generateCartProduct(img,title,priceNumber, id));
       printQuantity();
        self.disabled = true;
        // add to cart
        
        
        
    });
})