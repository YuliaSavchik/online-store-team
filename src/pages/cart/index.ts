import Page from '../../components/templates/page';

class CartPage extends Page {
  constructor(id: string) {
    super(id);
  }
  private createContent() {
    //test content
    const content = document.createElement('h1');
    content.innerHTML = 'Cart Page';
    return content;
  }
  render() {
    const content = this.createContent();
    this.container.append(content)
    return this.container;
  }
}

export default CartPage;
