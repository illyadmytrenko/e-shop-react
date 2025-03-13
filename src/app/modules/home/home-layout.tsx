import { Product } from "@/common/types/product";
import { CustomButton } from "@/common/components/custom-button/custom-button";
import { CustomImage } from "@/common/components/custom-image/custom-image";
import { HomeNavigation } from "./ui/home-navigation";
import { HomeProductsList } from "./ui/home-products-list";
import { CustomH3 } from "@/common/components/custom-h3/custom-h3";
import { BottomList } from "@/common/components/bottom-list/bottom-list";

interface HomeLayoutProps {
  handleExploreMore: () => void;
  handleCategoryClick: (category: string) => void;
  handleViewWatchClick: () => void;
  handleViewPS5Click: () => void;
  newestProducts: Product[];
  bestSellersProducts: Product[];
}

export function HomeLayout({
  handleExploreMore,
  handleCategoryClick,
  handleViewWatchClick,
  handleViewPS5Click,
  newestProducts,
  bestSellersProducts,
}: HomeLayoutProps) {
  return (
    <div>
      <main className="flex flex-col-reverse items-center lg:items-stretch lg:flex-row lg:justify-between lg:pt-5 mb-6 lg:mb-10">
        <div className="xl:min-w-[350px] flex flex-col justify-between lg:py-5 xl:py-10 text-center lg:text-left">
          <div className="mb-5">
            <h1 className="text-[40px] xl:text-[64px] md:text-[48px] text-blue-950 font-bold mb-5 lg:mb-10">
              Tech Heim
            </h1>
            <p className="text-[32px] text-blue-950 font-medium">
              &quot;Join the{" "}
              <span className="text-orange-500">digital revolution&quot;</span>
            </p>
          </div>
          <CustomButton
            size="lg"
            variant="orange"
            onClick={handleExploreMore}
            className="self-stretch lg:self-start"
          >
            Explore More
          </CustomButton>
        </div>
        <CustomImage
          alt="main image"
          src="/home/main.png"
          width={728}
          height={443}
          className="pt-10 pb-5 lg:py-0"
        />
      </main>
      <HomeNavigation
        classNameUl="overflow-x-auto max-w-full p-5"
        classNameLi="shadow-[0px_0px_8px_2px_#717171] p-2 xl:py-3 xl:px-6 rounded-md shrink-0 xl:shrink 
        transition-all duration-300 hover:scale-105 hover:shadow-[0px_2px_12px_2px_rgba(31,99,198,0.8)] hover:bg-blue-100"
        classNameImg="mb-1 md:mb-4"
        handleCategoryClick={handleCategoryClick}
      />
      <HomeProductsList
        title="New Products"
        products={newestProducts}
        sortType="new"
      />
      <div
        className="hidden md:flex justify-between gap-10 bg-blue-700 py-5 md:py-10 md:pl-32 lg:pl-40 xl:pl-44 md:pr-10 lg:pr-32 xl:pr-36
        items-center relative z-0 overflow-hidden before:absolute before:-z-10
        before:-left-[5%] before:-top-[20%] before:w-[20%] before:h-[50%] before:rounded-full
        before:bg-orange-300 before:content-[''] after:absolute after:-z-10 after:-left-[10%] after:-bottom-[200px]
        after:w-[120%] after:h-full after:rounded-t-full after:bg-orange-300 after:content-['']"
      >
        <div className="flex flex-col items-center z-10 mt-10">
          <h2 className="text-orange-300 font-bold text-5xl mb-20 self-start">
            Play Station 5
          </h2>
          <p className="text-blue-700 font-medium text-2xl mb-8">
            Digital Edition + 2 TB
          </p>
          <CustomButton size="sm" variant="blue" onClick={handleViewPS5Click}>
            Buy Now
          </CustomButton>
        </div>
        <CustomImage
          alt="play station 5 image"
          src="/home/ps5.png"
          width={350}
          height={300}
        />
      </div>
      <div
        className="flex md:hidden flex-col gap-10 px-5 py-5 bg-blue-700 items-center relative z-0 overflow-hidden
        before:absolute before:-z-10 before:-left-[5%] before:-top-[20%] min-[500px]:before:w-[30%] before:h-[50%] before:rounded-full
        before:bg-orange-300 before:content-[''] after:absolute after:-z-10 after:-left-[10%] after:-bottom-[100px]
        after:w-[120%] after:h-full after:rounded-t-full after:bg-orange-300 after:content-['']"
      >
        <h2 className="text-orange-300 font-bold text-3xl mt-5 mb-5 min-[500px]:mb-10 min-[500px]:ml-0">
          Play Station 5
        </h2>
        <div className="flex flex-col-reverse min-[500px]:flex-row justify-between items-center min-[500px]:items-stretch gap-8">
          <div className="flex flex-row gap-6 min-[500px]:flex-col items-center z-10 min-[500px]:mt-20 pl-0 min-[500px]:pl-8 min-[500px]:min-w-[200px]">
            <p className="text-blue-700 font-medium text-xl">
              Digital Edition + 2 TB
            </p>
            <CustomButton size="sm" variant="blue" onClick={handleViewPS5Click}>
              Buy Now
            </CustomButton>
          </div>
          <CustomImage
            alt="play station 5 image"
            src="/home/ps5.png"
            width={350}
            height={300}
          />
        </div>
      </div>
      <HomeProductsList
        title="Best Sellers"
        products={bestSellersProducts}
        sortType="bestSellers"
      />
      <div className="mb-8 lg:mb-12">
        <CustomH3>Top Brands</CustomH3>
        <div className="flex justify-between items-center gap-4 max-w-full overflow-x-auto pb-2">
          <CustomImage
            alt="brand icon"
            src="/home/brands/apple.png"
            width={46}
            height={57}
            className="shrink-0"
          />
          <CustomImage
            alt="brand icon"
            src="/home/brands/sony.png"
            width={200}
            height={35}
            className="shrink-0"
          />
          <CustomImage
            alt="brand icon"
            src="/home/brands/samsung.png"
            width={213}
            height={33}
            className="shrink-0"
          />
          <CustomImage
            alt="brand icon"
            src="/home/brands/canon.png"
            width={175}
            height={30}
            className="shrink-0"
          />
          <CustomImage
            alt="brand icon"
            src="/home/brands/huawei.png"
            width={90}
            height={67}
            className="shrink-0"
          />
          <CustomImage
            alt="brand icon"
            src="/home/brands/lenovo.png"
            width={153}
            height={50}
            className="shrink-0"
          />
        </div>
      </div>
      <div
        className="flex justify-between min-[400px]:gap-5 bg-slate-700 py-5 md:py-10 pl-4 sm:pl-8 md:pl-12 lg:pl-16 min-[400px]-pr:10 sm:pr-20 md:pr-28 lg:pr-36
        items-center relative z-0 overflow-hidden
        after:absolute after:-z-10 after:-right-[250px] after:bottom-0 after:w-[120%] min-[400px]:after:w-[108%] sm:after:w-[95%] md:after:w-[80%]
        lg:after:w-[65%] xl:after:w-[60%] after:h-full after:rounded-full after:bg-red-500 after:content-['']"
      >
        <div className="flex flex-col items-center z-10">
          <h2 className="text-white font-bold text-3xl md:text-5xl mb-2 md:mb-4">
            Smart Watch
          </h2>
          <p className="text-white font-medium text-xl md:text-2xl mb-4 md:mb-8">
            Various designs and brands
          </p>
          <CustomButton size="sm" variant="red" onClick={handleViewWatchClick}>
            View
          </CustomButton>
        </div>
        <CustomImage
          alt="watch image"
          src="/home/watches.png"
          width={500}
          height={390}
        />
      </div>
      <BottomList />
    </div>
  );
}
