//import { products } from "../../data/data";
import { Product } from "../../types/interfaces";
import { createMainButtons } from "../buttons/index";

const btnAddToCard = createMainButtons('add to card', 'button_meddium-size', 'btn-add-card');
const btnBuyNowInDescription = createMainButtons('buy now', 'button_meddium-size', 'product-description__btn-buy-now');

export class ProductCardPage {
  data: Product;

  constructor(data: Product) {
    this.data = data;
  }

  render(){
    //main block 
    const wrapper : HTMLDivElement = document.createElement('div');
    wrapper.classList.add('pro-card-wrapper');
    //navigation
    const navigation : HTMLDivElement = document.createElement('div');
    navigation.classList.add('prod-card-navigation');

    const linkForMainPage : HTMLAnchorElement = document.createElement('a');
    linkForMainPage.classList.add('prod-card-navigation__main-page-link');
    linkForMainPage.setAttribute('href', '#main-page');
    linkForMainPage.textContent = 'store';

    const device : HTMLDivElement = document.createElement('div');
    device.classList.add('prod-card-navigation__device');
    device.textContent = 'device';

    const nameDevice : HTMLDivElement = document.createElement('div');
    nameDevice.classList.add('prod-card-navigation__name-device');
    nameDevice.textContent = `${this.data.device}`;

    const arrow1 : HTMLDivElement = document.createElement('div');
    arrow1.classList.add('prod-card-navigation__arrow');
    arrow1.textContent = '>';
    const arrow2 : HTMLDivElement = document.createElement('div');
    arrow2.classList.add('prod-card-navigation__arrow');
    arrow2.textContent = '>';

    navigation.append(linkForMainPage, arrow1, device, arrow2, nameDevice)
    
    //block 'product card page'
    const productCardBlock : HTMLDivElement = document.createElement('div');
    productCardBlock.classList.add('prod-card');

    //block with product images
    const imagesBlock : HTMLDivElement = document.createElement('div');
    imagesBlock.classList.add('prod-card__images');

    const mainImage : HTMLImageElement = document.createElement('img');
    mainImage.classList.add('prod-card__images_main-image');
    mainImage.setAttribute('src', this.data.mainImage)

    const image1 : HTMLImageElement = document.createElement('img');
    image1.classList.add('prod-card__images_image-1');
    image1.setAttribute('src', this.data.image_1)

    const image2 : HTMLImageElement = document.createElement('img');
    image2.classList.add('prod-card__images_image-2');
    image2.setAttribute('src', this.data.image_2)

    imagesBlock.append(mainImage, image1, image2)

    image1.addEventListener("click", () => {
      [mainImage.src, image1.src] = [image1.src, mainImage.src];
    });

    image2.addEventListener("click", () => {
      [mainImage.src, image2.src] = [image2.src, mainImage.src];
    });

    //block with description
    const pageDescriptionBlock : HTMLDivElement = document.createElement('div');
    pageDescriptionBlock.classList.add('prod-card__description')

    const descriptionBlock : HTMLDivElement = document.createElement('div');
    descriptionBlock.classList.add('prod-card__description__desc');

    //description title
    const titleDescriptionBlock : HTMLDivElement = document.createElement('div');
    titleDescriptionBlock.classList.add('prod-card__description__desc_title');

    titleDescriptionBlock.appendChild(document.createTextNode(this.data.name))

    //main description
    const descriptionBlockMain : HTMLDivElement = document.createElement('div');
    descriptionBlockMain.classList.add('prod-card__description__desc_main-desc')

    descriptionBlockMain.innerHTML = `<span><b>Description: </b>${this.data.description}</span> 
    <br><br>
    <span><b>Material: </b>${this.data.material}</span> 
    <br><br>
    <span><b>Color: </b>${this.data.color}</span> 
    <br><br>
    <span><b>Rating: </b>${this.data.rating}/5</span> 
    <br><br>
    <span><b>Stock: </b>${this.data.stock}</span>`

    //block with price
    const priceBlock : HTMLDivElement = document.createElement('div');
    priceBlock.classList.add('prod-card__description__desc_price');

    priceBlock.appendChild(document.createTextNode(`PRICE: ${this.data.price}$`))

    //buttons
    const buttonsArea : HTMLDivElement = document.createElement('div');
    buttonsArea.classList.add('prod-card__description__buttons');
    const buttonsAddRemoveBox : HTMLDivElement = document.createElement('div');
    buttonsAddRemoveBox.classList.add(`description-btn-box-${this.data.id}`);
    btnBuyNowInDescription.setAttribute('data-idbtn', `${this.data.id}`);
    btnAddToCard.setAttribute('data-idbtn', `${this.data.id}`);
    buttonsAddRemoveBox.append(btnAddToCard.cloneNode(true));
    
    buttonsArea.append(buttonsAddRemoveBox.cloneNode(true), btnBuyNowInDescription.cloneNode(true))

    descriptionBlock.append(titleDescriptionBlock, descriptionBlockMain, priceBlock)
    pageDescriptionBlock.append(descriptionBlock, buttonsArea)
    productCardBlock.append(imagesBlock, pageDescriptionBlock)
    
    wrapper.append(navigation, productCardBlock)
    
    return wrapper;
  }
}


//const productCardPage : ProductCardPage = new ProductCardPage(products[1])

//You can create product card page:
//const addProductCardPage : HTMLDivElement = productCardPage.render()
