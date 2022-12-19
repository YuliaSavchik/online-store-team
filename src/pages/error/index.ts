import Page from "../../components/templates/page";

class ErrorPage extends Page {
  constructor(id: string) {
    super(id);
  }
  private createContent() {
    const content = document.createElement('h1');
    content.innerHTML = 'Error Page';
    return content;
  }
  render() {
    const content = this.createContent();
    this.container.append(content)
    return this.container;
  }
}

export default ErrorPage;
