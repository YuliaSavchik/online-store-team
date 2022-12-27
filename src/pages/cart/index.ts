import Page from '../../components/templates/page';
import { createArrowButtons } from '../../components/buttons/index';
import { CartProducts } from '../../components/cartProducts/index';
import { products } from '../../data/data';
import { creatSummaryBlock } from '../../components/summary/index';
class CartPage extends Page {
  idCard: string;

  constructor(id: string, idCard: string) {
    super(id);
    this.idCard = idCard;
  }
  private createContent() {
    const pricesArr: number[] = []
    const cartWrapper: HTMLDivElement = document.createElement('div');
    cartWrapper.classList.add('cart__wrapper');

    const mainBlock: HTMLDivElement = document.createElement('div');
    mainBlock.classList.add('cart__main-block');

    const titleBlock: HTMLDivElement = document.createElement('div');
    titleBlock.classList.add('main-block__title-block');

    const title: HTMLElement = document.createElement('p');
    title.textContent = 'products in cart';

    const itemsCount: HTMLDivElement = document.createElement('div');
    itemsCount.classList.add('title-block__item-count');
    itemsCount.textContent = `items: ${3}`;

    const paginationBlock: HTMLDivElement = document.createElement('div');
    paginationBlock.classList.add('pagination-block');

    const paginationTitle: HTMLElement = document.createElement('p');
    paginationTitle.textContent = 'pages:';

    const btnArrowleft = createArrowButtons('button-arrow_left');
    const btnArrowRight = createArrowButtons('button-arrow_right');

    const pageNumber: HTMLDivElement = document.createElement('div');
    pageNumber.classList.add('pagination-block__page-namber');
    pageNumber.textContent = `${pricesArr.length}`;

    paginationBlock.append(
      paginationTitle,
      btnArrowleft,
      pageNumber,
      btnArrowRight
    )

    titleBlock.append(
      title,
      itemsCount, 
      paginationBlock
    )
    const result: CartProducts = new CartProducts(products[Number(this.idCard) - 1], 1);
    const price: number = products[Number(this.idCard) - 1].price;
    pricesArr.push(price);
    mainBlock.append(titleBlock, result.render());

    const summatyBlock: HTMLDivElement = document.createElement('div');
    summatyBlock.classList.add('cart__summaty-block');
    summatyBlock.append(
      creatSummaryBlock(pricesArr)
    );
    
    cartWrapper.append(mainBlock, summatyBlock);

    return cartWrapper; 
  }
  render() {
    const content = this.createContent();
    this.container.append(content)
    return this.container;
  }
}

export default CartPage;
