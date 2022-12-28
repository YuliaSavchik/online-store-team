import './index.html'; 
import './main.scss';
import 'normalize.css';

import { infinitySlider } from './components/infinitySlider/index';
import App from './pages/app/index';
import { Product } from './types/interfaces';

const sliderBlock = document.querySelector<HTMLDivElement>('.header__slider');
const addHeaderSlider : HTMLDivElement = infinitySlider();
sliderBlock?.append(addHeaderSlider);


const app = new App;
app.renderPage();

export const productsInCart: Product[] = [];

