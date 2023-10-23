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

const itemsOnThePage: any = 10;
export default function usePagination(
  checkBox: any,
  products: Product[],
  minMaxPrice: any,
  searchInput: string = "",
  sortHow: number = 10
): any {
  const selectedBrands = Object.entries(checkBox.brands[1])
    .filter(([brand, isChecked]) => isChecked)
    .map(([brand]) => brand);

  const selectedCategories = Object.entries(checkBox.categories[1])
    .filter(([category, isChecked]) => isChecked)
    .map(([category]) => category);

  const [minPrice, maxPrice] = minMaxPrice[1];

  // Проверка на наличие текста перед приведением к нижнему регистру
  const trimmedSearchInput = searchInput.trim();
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
    case 20:
      filteredProducts.sort((a, b) => a.price - b.price);
      break;
    case 30:
      filteredProducts.sort((a, b) => b.price - a.price);
      break;
    case 40:
      filteredProducts.sort((a, b) => b.rating - a.rating);
      break;
    case 50:
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
  let productsOnPage: any[] = [];
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
