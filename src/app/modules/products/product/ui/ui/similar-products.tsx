import { Product } from "@/common/types/product";
import { ProductCharacteristics } from "@/common/types/product-characteristics";
import { useMemo } from "react";
import Slider from "react-slick";
import { ProductCard } from "@/common/components/product-card/product-card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SimilarProductsProps {
  currentProduct: Product;
  allProducts: Product[];
  productCharacteristics: ProductCharacteristics;
  productsCharacteristics: ProductCharacteristics[];
}

export function SimilarProducts({
  currentProduct,
  allProducts,
  productCharacteristics,
  productsCharacteristics,
}: SimilarProductsProps) {
  const similarProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        if (
          product.id === currentProduct.id ||
          product.category !== currentProduct.category
        ) {
          return false;
        }

        const sameBrand = product.brand === currentProduct.brand;

        const productChars = productsCharacteristics.find(
          (pc) => pc.productId === product.id
        );

        if (!productChars) return false;

        const matchingChars = (
          [
            "char1",
            "char2",
            "char3",
            "char4",
            "char5",
            "char6",
            "char7",
            "char8",
          ] as (keyof ProductCharacteristics)[]
        ).filter((char) => productChars[char] === productCharacteristics[char]);
        const similarityRatio = matchingChars.length / 8;

        return sameBrand || similarityRatio >= 0.375;
      })
      .slice(0, 8);
  }, [
    currentProduct,
    allProducts,
    productCharacteristics,
    productsCharacteristics,
  ]);

  const settings = {
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="mb-8 md:mb-12">
      <h5 className="mb-4 text-xl font-medium">Similar Products</h5>
      {similarProducts.length > 4 ? (
        <Slider {...settings}>
          {similarProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mt-8">
          {similarProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
