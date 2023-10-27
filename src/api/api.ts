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
    .then((resposne) => {
      const data = useData(resposne.data);
      product.setAll(data);
      const products: Product[] = data.products;
      const newMinMaxPrice: [number[], number[]] = [
        [products[0].price, products[0].price],
        [products[0].price, products[0].price],
      ];
      products.map((product: Product) => {
        if (product.price < newMinMaxPrice[0][0]) {
          newMinMaxPrice[0][0] = Number(product.price);
          newMinMaxPrice[1][0] = Number(product.price);
        }
        if (product.price > newMinMaxPrice[0][1]) {
          newMinMaxPrice[0][1] = Number(product.price);
          newMinMaxPrice[1][1] = Number(product.price);
        }
      });
      minMaxPrice.setAll(newMinMaxPrice);
    })
    .catch((error) => {
      console.log(`Помилка! Деталi: ${error}`);
    });
};
