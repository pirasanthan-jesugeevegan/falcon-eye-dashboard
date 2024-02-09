import products from '../menu-items/product.json';

export function getSlugByName(name) {
  const product = products.find((p) => p.name === name);
  console.log(product);
  return product ? product.slug : name;
}

export function getApiByName(name) {
  const product = products.find((p) => p.name === name);
  console.log(product);
  return product ? product.api : name;
}
