import Page from "../../components/templates/page";

class ProductDiscriptionPage extends Page {
  constructor(id: string) {
    super(id);
  }
  private createContent() {
    const content = document.createElement('h1');
    content.innerHTML = 'Discription Page';
    return content;
  }
  render() {
    const content = this.createContent();
    this.container.append(content)
    return this.container;
  }
}

export default ProductDiscriptionPage;
