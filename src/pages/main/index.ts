import Page from '../../components/templates/page';
import { creatSummaryBlock } from '../../components/summary/index';
class MainPage extends Page {
  constructor(id: string) {
    super(id);
  }

  private createContent() {
    //test content
    //const content = document.createElement('h1');
    //content.textContent = 'Main page'

    const content = creatSummaryBlock();

    return content;
  }
  render() {
    const content = this.createContent();
    this.container.append(content)
    return this.container;
  }
}

export default MainPage;
