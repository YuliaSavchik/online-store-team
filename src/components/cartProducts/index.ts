import { products } from "../../data/data";
import { Product } from "../../types/interfaces";
import {createInputCoutnInCart} from "../inputs/index"

export class CartProducts {
  data: Product;

  constructor(data: Product) {
    this.data = data;
  }

  render() {
    const cartProductBlock = document.createElement("div");
    cartProductBlock.classList.add('cart-products');

    //product number
    const productNumber = document.createElement("div");
    productNumber.classList.add('cart-products__number');

    //image
    const productImg = document.createElement("div");
    productImg.classList.add('cart-products__image');
    const img = document.createElement('img')
    img.setAttribute('src', this.data.mainImage)

    productImg.appendChild(img)

    //description
    const productDesc = document.createElement("div");
    productDesc.classList.add('cart-products__desc');
    const text = document.createElement('div');
    text.classList.add('cart-products__desc_text');
    text.innerHTML = `<span>${this.data.name}</span>
    <br>
    <span>${this.data.material}</span>
    <br>
    <span>${this.data.color}</span>
    <br>
    <span>${this.data.rating}/5</span>`

    productDesc.appendChild(text)

    //range
    const productRange = document.createElement("div");
    productRange.classList.add('cart-products__range');

    const rangeStock = document.createElement("div");
    rangeStock.classList.add('cart-products__range_stock');

    rangeStock.innerHTML = `Stock: <b>${this.data.stock}</b>`

    const rangeInput = document.createElement("div");
    rangeInput.classList.add('cart-products__range_input');

    rangeInput.appendChild(createInputCoutnInCart())

    const rangePrice = document.createElement("div");
    rangePrice.classList.add('cart-products__range_price');

    rangePrice.innerHTML = `Price: <b>${this.data.price}$</b>`

    productRange.append(rangeStock, rangeInput, rangePrice)

    cartProductBlock.append(productNumber, productImg, productDesc, productRange)

    return cartProductBlock
  }
}

const main = document.querySelector('.main');

const result = new CartProducts(products[1])

main?.appendChild(result.render())