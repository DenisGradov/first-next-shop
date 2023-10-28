import { Product } from "@/types/types";

interface Params {
  products: Product[];
  productsWithPagination: any;
  activePage: number;
  total: number;
  skip: number;
  limit: number;
}
interface CheckBox {
  brandName: string;
  isChecked: boolean;
}
interface InfoToReturn {
  products: Product[];
  productsWithPagination: any;
  activePage: number;
  brands: string[];
  brandsCheckBox: CheckBox[];
  categories: string[];
  categoriesCheckBox: CheckBox[];
  cart: Product[];
}
const brands: string[] = [];
const categories: string[] = [];
const cart: Product[] = [];
const brandsCheckBox: CheckBox[] = [];
const categoriesCheckBox: CheckBox[] = [];
const activePage = 0;
const productsWithPagination = [0];
export default function useData(params: Params): InfoToReturn {
  const products: Product[] = params.products;
  products.map((product: Product) => {
    !brands.includes(product.brand) ? brands.push(product.brand) : "";
    !categories.includes(product.category)
      ? categories.push(product.category)
      : "";
  });
  return {
    products,
    activePage,
    brands,
    brandsCheckBox,
    productsWithPagination,
    categories,
    categoriesCheckBox,
    cart,
  };
}
