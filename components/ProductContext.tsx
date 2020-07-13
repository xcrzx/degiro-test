import React from "react";
import {
  getInitialProducts,
  Product,
  ProductUpdate,
  subscribeToProductUpdates,
  defaultFields,
  ProductFields,
} from "../lib/products";

type ProductContextType = {
  products: Product[];
};

const ProductContext = React.createContext<ProductContextType>({
  products: [],
});

type ProductContextProviderProps = {
  children: React.ReactNode;
};

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  const [products, setProducts] = React.useState(getInitialProducts());

  const handleProductUpdate = React.useCallback((e: ProductUpdate) => {
    setProducts((products) => {
      return products.map((product) =>
        product.id === e.id ? { ...product, [e.field]: e.value } : product
      );
    });
  }, []);

  React.useEffect(() => {
    return subscribeToProductUpdates(
      { products, fields: Object.keys(defaultFields) as ProductFields[] },
      handleProductUpdate
    );
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  return React.useContext(ProductContext);
};
