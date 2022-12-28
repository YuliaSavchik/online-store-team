import Page from '../../components/templates/page';
import { createMainButtons } from '../../components/buttons/index';
import { createSearchInput } from '../../components/inputs/index';
import { createViewPageButtons } from '../../components/buttons/index';
import { createFilterBlock } from '../../components/filters/index';
import { createNoUiSliderBlock } from '../../components/noUiSlider/index';
import { createCardsArea, sortSelect } from '../../components/productCards/index';
class MainPage extends Page {
  constructor(id: string) {
    super(id);
  }

  private createContent() {
    const mainWrapper: HTMLDivElement = document.createElement('div');
    mainWrapper.classList.add('main__wrapper');

    const settings: HTMLDivElement = document.createElement('div');
    settings.classList.add('main__settings');

    const btnBlock: HTMLDivElement = document.createElement('div');
    btnBlock.classList.add('settings__btn-block');
    const btnReset = createMainButtons('reset', 'button_meddium-size', 'btn-reset');
    const btnCopyLink = createMainButtons('copy link', 'button_meddium-size', 'btn-copy-link');
    btnBlock.append(btnReset, btnCopyLink);

    const btnSort = sortSelect;

    const found: HTMLDivElement = document.createElement('div');
    found.classList.add('found');
    found.textContent = `Found: ${15}`;

    const searchInput = createSearchInput();

    const btnViewBlock: HTMLDivElement = document.createElement('div');
    btnViewBlock.classList.add('btn-view-block'); 
    const btnViewThreeColums = createViewPageButtons('button-view_three-colums');
    const btnViewTwoColums = createViewPageButtons('button-view_two-colums');
    btnViewBlock.append(btnViewThreeColums, btnViewTwoColums);

    settings.append(
      btnBlock, 
      btnSort, 
      found,
      searchInput,
      btnViewBlock
    );

    const mainContent: HTMLDivElement = document.createElement('div');
    mainContent.classList.add('main__content');
    const filtersBlock: HTMLDivElement = document.createElement('div');
    filtersBlock.classList.add('filters-block');
    const addFilterBlock: HTMLElement = createFilterBlock();
    const rangePrice = createNoUiSliderBlock('price');
    rangePrice.classList.add('range-slider_border');
    const rangeStock = createNoUiSliderBlock('stock');
    filtersBlock.append(addFilterBlock, rangePrice, rangeStock);
    
    const productsBlock: HTMLDivElement = document.createElement('div');
    productsBlock.classList.add('products-block');
    const addCardsArea : HTMLDivElement = createCardsArea();
    productsBlock.append(addCardsArea);

    mainContent.append(filtersBlock, productsBlock);
    mainWrapper.append(settings, mainContent);
    return mainWrapper;
  }
  render() {
    const content = this.createContent();
    this.container.append(content)
    return this.container;
  }
}

export default MainPage;
