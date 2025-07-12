export const ProductSearchableFields = ["title", "description", "category"];

export type TProduct = {
  imgUrl: string;
  title: string;
  price: number;
  description: string;
  quantity: number;
  inStock: boolean;
};
