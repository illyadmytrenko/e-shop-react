import { Product } from "@/common/types/product";
import { CustomH3 } from "@/common/components/custom-h3/custom-h3";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { ProductCard } from "@/common/components/product-card/product-card";

interface HomeProductsListProps {
  title: string;
  products: Product[];
  sortType: string;
}

export function HomeProductsList({
  title,
  products,
  sortType,
}: HomeProductsListProps) {
  return (
    <div className="mb-8 lg:mb-12">
      <div className="relative">
        <CustomH3>{title}</CustomH3>
        <Link
          className="cursor-pointer absolute right-0 bottom-0"
          to={"/products"}
          state={{ sortType }}
        >
          View all <NavigateNextIcon />
        </Link>
      </div>
      <ul className="grid grid-cols-1 min-[450px]:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 h-[50vh] min-[450px]:h-auto p-4 overflow-y-auto">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
}
