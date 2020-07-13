import { ProductContextProvider } from "../components/ProductContext";
import { ProductsTable } from "../components/ProductsTable";

const IndexPage = () => {
  return (
    <ProductContextProvider>
      <ProductsTable />
    </ProductContextProvider>
  );
};

export default IndexPage;
