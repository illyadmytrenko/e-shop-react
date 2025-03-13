import { Product } from "@/common/types/product";
import { ProductCharacteristics } from "@/common/types/product-characteristics";
import { Comment } from "../../api";
import { useMemo, useRef } from "react";
import { COLOR_MAP } from "@/common/constants/color-map";
import { CustomBreadcrumb } from "@/common/components/custom-breadcrumb/custom-breadcrumb";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import { TechnicalDetails } from "./ui/technical-details";
import { SimilarProducts } from "./ui/similar-products";
import { Comments } from "./ui/comments";

interface ProductInfoLayoutProps {
  product: Product;
  productCharacteristics: ProductCharacteristics;
  products: Product[];
  productsCharacteristics: ProductCharacteristics[];
  handleBuyNow: () => void;
  handleAddToCart: () => void;
  userId: number;
  showAlert: (text: string) => void;
  comments: Comment[];
}

export function ProductInfoLayout({
  product,
  productCharacteristics,
  products,
  productsCharacteristics,
  handleBuyNow,
  handleAddToCart,
  userId,
  showAlert,
  comments,
}: ProductInfoLayoutProps) {
  const images = [
    product.image ?? "/products/sample.png",
    product.image ?? "/products/sample.png",
    product.image ?? "/products/sample.png",
    product.image ?? "/products/sample.png",
  ];

  const color = useMemo(
    () => COLOR_MAP[product.color] || "rgb(0, 0, 0)",
    [product.color]
  );

  const techDetailsRef = useRef<HTMLDivElement>(null);
  const similarProductsRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div>
      <CustomBreadcrumb name={product.name} />
      <div className="flex flex-col md:flex-row items-center md:items-stretch gap-6 md:gap-10 mb-8 md:mb-12 pl-2 sm:pl-0">
        <LightGallery
          mode="lg-fade"
          speed={500}
          elementClassNames="flex justify-center flex-wrap gap-4 max-w-[550px]"
        >
          <a href={images[0]}>
            <CustomImage
              src={images[0]}
              alt={product.name}
              width={500}
              height={340}
            />
          </a>
          {images.slice(1).map((image, index) => (
            <a key={index} href={image}>
              <CustomImage
                src={image}
                alt={product.name}
                width={100}
                height={100}
              />
            </a>
          ))}
        </LightGallery>
        <div>
          <div className="mb-6">
            <div className="mb-2">
              <h5 className="text-2xl font-bold mb-1">{product.name}</h5>
              <h6 className="text-xl font-semibol">{product.description}</h6>
            </div>
            <div className="flex items-center gap-6">
              <div
                className="bg-blue-900 p-2 rounded-md flex items-center gap-1 relative 
              after:absolute after:-right-4 after:w-[1px] after:h-full after:bg-gray-500 after:top-0"
              >
                <CustomImage
                  src="/products/product/white-star.svg"
                  alt="white star icon"
                  width={16}
                  height={16}
                />
                <span className="text-sm text-white">
                  {product.rating ? product.rating.toFixed(1) : "N/A"}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                sold {product.sellsAmount}
              </span>
            </div>
          </div>
          <div className="text-xs text-gray-500 flex flex-wrap gap-5 mb-6">
            <div className="flex items-center gap-1">
              <CustomImage
                src="/cart/product-card/shop.svg"
                alt="shop icon"
                width={20}
                height={20}
                className="shrink-0"
              />
              <span>In Stock</span>
            </div>
            <div className="flex items-center gap-1">
              <CustomImage
                src="/cart/product-card/verify.svg"
                alt="verify icon"
                width={20}
                height={20}
                className="shrink-0"
              />
              <span>Guaranteed</span>
            </div>
            <div className="flex items-center gap-1">
              <CustomImage
                src="/cart/product-card/truck.svg"
                alt="truck icon"
                width={20}
                height={20}
                className="shrink-0"
              />
              <span>Free Delivery</span>
            </div>
          </div>
          <div className="flex items-center mb-8">
            <span
              className="inline-block w-4 h-4 rounded-full"
              style={{ backgroundColor: color }}
            ></span>
            <span className="ml-2">{product.color}</span>
          </div>
          <table className="text-left mb-8">
            <tbody>
              <tr>
                <td className="text-gray-500 relative after:absolute after:w-[6px] after:h-[6px] after:rounded-xl after:bg-gray-500 after:-left-1 after:top-[10px] pl-2">
                  Brand
                </td>
                <td className="font-semibold pl-5">{product.brand}</td>
              </tr>
              <tr>
                <td className="text-gray-500 relative after:absolute after:w-[6px] after:h-[6px] after:rounded-xl after:bg-gray-500 after:-left-1 after:top-[10px] pl-2">
                  Model Name
                </td>
                <td className="font-semibold pl-5">{product.name}</td>
              </tr>
            </tbody>
          </table>
          <div className="p-4 shadow-[0px_0px_5px_2px_#717171] rounded-lg md:max-w-[350px]">
            <span className="text-xl font-bold block mb-5">
              ${product.price}.00
            </span>
            <div className="flex flex-col gap-2">
              <CustomButton variant="blue" size="md" onClick={handleBuyNow}>
                Buy now
              </CustomButton>
              <CustomButton
                variant="outlined"
                size="md"
                onClick={handleAddToCart}
              >
                Add to cart
              </CustomButton>
            </div>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col sm:flex-row gap-4 sm:gap-6 mb-10 text-lg relative after:absolute after:w-[2px] sm:after:w-full md:after:w-3/4 lg:after:w-2/3
        after:h-full sm:after:h-[2px] after:bg-gray-500 after:-bottom-2"
      >
        <span
          className="cursor-pointer hover:text-blue-500 relative after:absolute after:bg-blue-500 after:h-full sm:after:h-[2px] hover:after:w-[2px] sm:hover:after:w-full
          after:left-0 after:-bottom-2 after:z-20 px-2"
          onClick={() => scrollToSection(techDetailsRef)}
        >
          Technical Details
        </span>
        <span
          className="cursor-pointer hover:text-blue-500 relative after:absolute after:bg-blue-500 after:h-full sm:after:h-[2px] hover:after:w-[2px] sm:hover:after:w-full
          after:left-0 after:-bottom-2 after:z-20 px-2"
          onClick={() => scrollToSection(similarProductsRef)}
        >
          Similar Products
        </span>
        <span
          className="cursor-pointer hover:text-blue-500 relative after:absolute after:bg-blue-500 after:h-full sm:after:h-[2px] hover:after:w-[2px] sm:hover:after:w-full
          after:left-0 after:-bottom-2 after:z-20 px-2"
          onClick={() => scrollToSection(commentsRef)}
        >
          Comments
        </span>
      </div>
      <div ref={techDetailsRef}>
        <TechnicalDetails
          productCharacteristics={productCharacteristics}
          productCategory={product.category}
        />
      </div>
      <div ref={similarProductsRef}>
        <SimilarProducts
          currentProduct={product}
          allProducts={products}
          productCharacteristics={productCharacteristics}
          productsCharacteristics={productsCharacteristics}
        />
      </div>
      <div ref={commentsRef}>
        <Comments
          productId={product.id}
          userId={userId}
          showAlert={showAlert}
          comments={comments}
        />
      </div>
    </div>
  );
}
