import useData from "@/hooks/useData";
import { useProduct } from "@/states/productInfo";
import { useMinMaxPrice } from "@/states/minMaxPrice";
import { Product } from "@/types/types";
import axios from "axios";

export const fetchData = () => {
  const product = useProduct.getState();
  const minMaxPrice = useMinMaxPrice.getState();

  axios
    .get("https://dummyjson.com/products/?limit=100")
    .then((response) => {
      const data = useData(response.data);
      product.setAll(data);
      const products: Product[] = data.products;

      let minProductPrice = products[0].price;
      let maxProductPrice = products[0].price;

      products.forEach((product: Product) => {
        if (product.price < minProductPrice) {
          minProductPrice = product.price;
        }
        if (product.price > maxProductPrice) {
          maxProductPrice = product.price;
        }
      });

      minMaxPrice.setProductPriceRange(minProductPrice, maxProductPrice);
      minMaxPrice.setSelectedPriceRange(minProductPrice, maxProductPrice);
    })
    .catch((error) => {
      console.log(`Помилка! Деталi: ${error}`);
    });
};
