import React from "react";
import { Product } from "../lib/products";
import { usePrevValue } from "../lib/usePrevValue";
import { useProducts } from "./ProductContext";
import styles from "./ProductsTable.module.css";

export const ProductsTable = () => {
  const { products } = useProducts();

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(products[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};

type ProductRowProps = {
  product: Product;
};

const ProductRow = ({ product }: ProductRowProps) => {
  return (
    <tr>
      {Object.entries(product).map(([key, value]) => (
        <ProductCell key={key} value={value} />
      ))}
    </tr>
  );
};

type ProductCellProps = {
  value: number;
};

const ProductCell = React.memo(({ value }: ProductCellProps) => {
  const prevValue = usePrevValue(value);
  const [className, setClassName] = React.useState("");

  React.useEffect(() => {
    if (prevValue !== value) {
      setClassName(
        value > 0 ? styles.positive : value < 0 ? styles.negative : ""
      );
      setTimeout(() => setClassName(""), 500);
    }
  }, [prevValue !== value]);

  return <td className={className}>{value}</td>;
});
