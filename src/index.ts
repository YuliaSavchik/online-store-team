import './index.html'; 
import './main.scss';
import 'normalize.css';

import App from './pages/app/index';
import { Product } from './types/interfaces';

const app = new App;
app.renderPage();

export const productsInCart: Product[] = [];
export const activPromoCode: string[] = [];
