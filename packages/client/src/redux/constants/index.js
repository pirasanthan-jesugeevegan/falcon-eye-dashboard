import products from '../../menu-items/product.json';
// theme constant
export const gridSpacing = 3;
export const drawerWidth = 260;
// state constant
export const initialState = products.reduce((state, product) => {
  state[product.api] = { data: [], lastUpdated: null };
  return state;
}, {});
