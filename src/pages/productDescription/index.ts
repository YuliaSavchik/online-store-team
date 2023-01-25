import Page from '../../components/templates/page';
import { products } from '../../data/data';
import { ProductCardPage } from '../../components/productCardPage/index';
class ProductDescriptionPage extends Page {
  idCard: string;

  constructor(id: string, idCard: string) {
    super(id);
    this.idCard = idCard;
  }
  private createContent() {
    const productCardPage: ProductCardPage = new ProductCardPage(products[Number(this.idCard) - 1])
    const addProductCardPage: HTMLDivElement = productCardPage.render()
    return addProductCardPage;
  }
  render() {
    const content = this.createContent();
    this.container.append(content)
    return this.container;
  }
}

export default ProductDescriptionPage;
