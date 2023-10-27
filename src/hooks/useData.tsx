import usePagination from "./usePagination";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
interface Params {
  products: Product[];
  productsWithPagination: any[];
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
  productsWithPagination: any[];
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
  products.map((i: Product) => {
    !brands.includes(i.brand) ? brands.push(i.brand) : "";
    !categories.includes(i.category) ? categories.push(i.category) : "";
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
