import Page from "../../components/templates/page";

class MainPage extends Page {
  constructor(id: string) {
    super(id);
  }

  private createContent() {
    const content = document.createElement('h1');
    content.innerHTML = 'Main Page';
    return content;
  }
  render() {
    const content = this.createContent();
    this.container.append(content)
    return this.container;
  }
}

export default MainPage;
