import { products } from "../../data/data";
import { Product } from "../../types/interfaces";
import { createMainButtons } from "../buttons/index";

const btnAddToCard = createMainButtons('add to card', 'button_meddium-size', 'btn-add-card');
const btnBuyNowInDescription = createMainButtons('buy now', 'button_meddium-size', 'product-description__btn-buy-now');

class ProductCardPage {
  data: Product;

  constructor(data: Product) {
    this.data = data;
  }

  render(){
    //main block 'product card page'
    const product_card_block = document.createElement('div');
    product_card_block.classList.add('prod-card');

    //block with product images
    const images_block = document.createElement('div');
    images_block.classList.add('prod-card__images');

    const main_image = document.createElement('img');
    main_image.classList.add('prod-card__images_main-image');
    main_image.setAttribute('src', this.data.mainImage)

    const image_1 = document.createElement('img');
    image_1.classList.add('prod-card__images_image-1');
    image_1.setAttribute('src', this.data.image_1)

    const image_2 = document.createElement('img');
    image_2.classList.add('prod-card__images_image-2');
    image_2.setAttribute('src', this.data.image_2)

    images_block.append(main_image, image_1, image_2)

    //block with description
    const page_description_block = document.createElement('div');
    page_description_block.classList.add('prod-card__description')

    const description_block = document.createElement('div');
    description_block.classList.add('prod-card__description__desc');

    //description title
    const title_description_block = document.createElement('div');
    title_description_block.classList.add('prod-card__description__desc_title');

    title_description_block.appendChild(document.createTextNode(this.data.name))

    //main description
    const description_block_description = document.createElement('div');
    description_block_description.classList.add('prod-card__description__desc_main-desc')

    description_block_description.innerHTML = `<span><b>Description: </b>${this.data.description}</span> 
    <br><br>
    <span><b>Material: </b>${this.data.material}</span> 
    <br><br>
    <span><b>Color: </b>${this.data.color}</span> 
    <br><br>
    <span><b>Rating: </b>${this.data.rating}/5</span> 
    <br><br>
    <span><b>Stock: </b>${this.data.stock}</span>`

    //block with price
    const price_block = document.createElement('div');
    price_block.classList.add('prod-card__description__desc_price');

    price_block.appendChild(document.createTextNode(`PRICE: ${this.data.price}$`))

    //buttons
    const buttons_area = document.createElement('div');
    buttons_area.classList.add('prod-card__description__buttons');

    buttons_area.append(btnAddToCard.cloneNode(true), btnBuyNowInDescription.cloneNode(true))

    description_block.append(title_description_block, description_block_description, price_block)
    page_description_block.append(description_block, buttons_area)
    product_card_block.append(images_block, page_description_block)

    return product_card_block
  }
}


const product_card_page = new ProductCardPage(products[17])

const main = document.querySelector(".main");

main?.appendChild(product_card_page.render())