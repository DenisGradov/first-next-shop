export interface Product {
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
export interface ProductInfo {
  products: Product[];
  activePage: number;
  brands: string[];
  categories: string[];
  productsWithPagination: any;
  cart: Product[];
  setAll: (values: Partial<ProductInfo>) => void;
}

export interface MinMaxPriceState {
  productPriceRange: {
    min: number;
    max: number;
  };
  selectedPriceRange: {
    min: number;
    max: number;
  };
  setProductPriceRange: (min: number, max: number) => void;
  setSelectedPriceRange: (min: number, max: number) => void;
}
export interface WindowSize {
  windowWidth: number | undefined;
  setAll: (windowWidth: number | undefined) => void;
}

export interface SortHow {
  values:
    | "Новинки"
    | "Від дешевих до дорогих"
    | "Від дорогих до дешевих"
    | "За рейтингом"
    | "За рейтингом зворотньо";
  setAll: (
    values:
      | "Новинки"
      | "Від дешевих до дорогих"
      | "Від дорогих до дешевих"
      | "За рейтингом"
      | "За рейтингом зворотньо"
  ) => void;
}

export interface FilterState {
  brands: [boolean, Record<string, boolean>];
  categories: [boolean, Record<string, boolean>];
  setBrands: (value: [boolean, Record<string, boolean>]) => void;
  setCategories: (value: [boolean, Record<string, boolean>]) => void;
}
