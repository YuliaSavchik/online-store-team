abstract class Page {
  protected container: HTMLElement;
  id: string;

  constructor(id: string) {
    this.container = document.createElement('div');
    this.id = id;
  }

  render() {
    return this.container;
  }
}

export default Page;
