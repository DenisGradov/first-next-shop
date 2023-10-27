import { useFilters } from "@/states/filters";
import { useMinMaxPrice } from "@/states/minMaxPrice";
import { useProduct } from "@/states/productInfo";
import { useSearchInput } from "@/states/searchInput";
import { useSortHow } from "@/states/sortHow";
import { MinMaxPriceState, Product } from "@/types/types";

const itemsOnThePage: number = 10;

export default function usePagination() {
  const filters = useFilters.getState();
  const minMaxPrice: MinMaxPriceState = useMinMaxPrice.getState();
  const searchInput = useSearchInput.getState();
  const products = useProduct.getState().products;
  const sortHow = useSortHow.getState().values;
  const selectedBrands = Object.entries(filters.brands[1])
    .filter(([brand, isChecked]) => isChecked)
    .map(([brand]) => brand);

  const selectedCategories = Object.entries(filters.categories[1])
    .filter(([category, isChecked]) => isChecked)
    .map(([category]) => category);

  const [minPrice, maxPrice] = minMaxPrice.values[1];

  // Проверка на наличие текста перед приведением к нижнему регистру
  const trimmedSearchInput = searchInput.values.trim();
  const hasSearchInput = !!trimmedSearchInput;
  const searchInputLowercased = trimmedSearchInput.toLowerCase();

  let filteredProducts = products.filter((product) => {
    const matchesBrand = selectedBrands.length
      ? selectedBrands.includes(product.brand)
      : true;
    const matchesCategory = selectedCategories.length
      ? selectedCategories.includes(product.category)
      : true;
    const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    const matchesSearch = hasSearchInput
      ? product.title.toLowerCase().includes(searchInputLowercased) ||
        product.description.toLowerCase().includes(searchInputLowercased)
      : true;

    return matchesBrand && matchesCategory && matchesPrice && matchesSearch;
  });
  switch (sortHow) {
    case "Від дешевих до дорогих":
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case "Від дорогих до дешевих":
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case "За рейтингом":
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case "За рейтингом зворотньо":
      filteredProducts.sort((a, b) => a.rating - b.rating);
      break;
    default:
      // Ничего не делаем, если sortHow равно 10 или любому другому неизвестному значению
      break;
  }

  if (filteredProducts.length == 0) {
    filteredProducts = products;
  }
  const productsForPagination = [];
  let productsOnPage: Product[] = [];
  let index = itemsOnThePage - 1;
  for (let i in filteredProducts) {
    index++;
    if (index == itemsOnThePage) {
      if (productsOnPage.length != 0) {
        productsForPagination.push(productsOnPage);
      }
      index = 0;
      productsOnPage = [];
    }
    productsOnPage.push(filteredProducts[i]);
    if (filteredProducts[i] == filteredProducts[filteredProducts.length - 1]) {
      productsForPagination.push(productsOnPage);
    }
  }
  return productsForPagination;
}
