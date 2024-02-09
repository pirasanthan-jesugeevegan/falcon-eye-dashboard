import products from '../product.json';

interface IProduct {
  api: string;
  name: string;
}

const getTableName = (type: string, product: string): string | null => {
  if (type === 'e2e' || type === 'unit') {
    return `${type}_${product}`;
  }
  return null;
};

const getNameByApi = (value: string): string | null => {
  const item: IProduct | undefined = products.find(
    (item: IProduct) => item.api === value
  );
  return item ? item.name : null;
};

export { getTableName, getNameByApi };
