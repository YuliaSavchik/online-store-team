import Page from '../../components/templates/page';

class ErrorPage extends Page {
  constructor(id: string) {
    super(id);
  }
  private createContent() {
    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('wrapper-errop-page');
    const content: HTMLParagraphElement = document.createElement('p');
    content.classList.add('page-error-text');
    content.textContent = 'Error 404. Page not found';
    wrapper.append(content);

    return wrapper;
  }
  render() {
    const content = this.createContent();
    this.container.append(content)
    return this.container;
  }
}

export default ErrorPage;
