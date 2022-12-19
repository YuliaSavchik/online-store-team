import Page from '../../components/templates/page';

class ProductDescriptionPage extends Page {
  constructor(id: string) {
    super(id);
  }
  private createContent() {
    //test content
    const content = document.createElement('h1');
    content.innerHTML = 'Description Page';
    return content;
  }
  render() {
    const content = this.createContent();
    this.container.append(content)
    return this.container;
  }
}

export default ProductDescriptionPage;
