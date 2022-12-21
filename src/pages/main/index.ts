import Page from '../../components/templates/page';
import { createInputCoutnInCart } from '../../components/inputs/index';
class MainPage extends Page {
  constructor(id: string) {
    super(id);
  }

  private createContent() {
    //test content
    //const content = document.createElement('h1');
    //content.textContent = 'Main page'

    const content = document.createElement('div');
    const inputCount = createInputCoutnInCart();
    content.append(inputCount);
    
    return content;
  }
  render() {
    const content = this.createContent();
    this.container.append(content)
    return this.container;
  }
}

export default MainPage;
