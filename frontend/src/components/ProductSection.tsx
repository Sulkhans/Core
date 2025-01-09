import { Link } from "react-router-dom";
import { ProductBaseType } from "../types/types";
import ProductCard from "./ProductCard";

type Props = {
  link?: string;
  heading: string;
  products: ProductBaseType[];
};

const ProductSection = ({ link, heading, products }: Props) => {
  return (
    <section>
      <h2 className="mb-4 text-xl font-semibold text-core-main">
        {link ? (
          <Link to={`/category/${link}?page=1`}>{heading}</Link>
        ) : (
          heading
        )}
      </h2>
      <div className="flex justify-between gap-8 overflow-x-auto">
        {products &&
          products.map((product: ProductBaseType) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </section>
  );
};

export default ProductSection;
