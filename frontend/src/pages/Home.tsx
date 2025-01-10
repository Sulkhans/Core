import ProductSection from "../components/ProductSection";
import {
  useGetNewProductsQuery,
  useGetProductsQuery,
  useGetRandomProductsQuery,
} from "../redux/api/productApiSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
//@ts-ignore
import "swiper/css";
//@ts-ignore
import "swiper/css/pagination";
import { BASE_URL } from "../redux/constants";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { data: newProducts } = useGetNewProductsQuery({});
  const { data: randomProducts } = useGetRandomProductsQuery({});
  const { data: phones } = useGetProductsQuery({ category: "phones" });
  const { data: tabs } = useGetProductsQuery({ category: "tabs" });
  const { data: laptops } = useGetProductsQuery({ category: "laptops" });
  return (
    <main className="pb-10 space-y-10">
      <Swiper
        spaceBetween={16}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={true}
        loop={true}
        modules={[Autoplay, Pagination]}
        className="w-full rounded-2xl"
      >
        <SwiperSlide>
          <div
            className="h-40 sm:h-48 md:h-60 lg:h-72 xl:h-80 bg-cover bg-start rounded-2xl"
            style={{
              backgroundImage: `url(${BASE_URL}/uploads/promotion1.png)`,
            }}
            onClick={() => navigate("/category/phones?page=1&brand=Apple")}
          />
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-40 sm:h-48 md:h-60 lg:h-72 xl:h-80 bg-cover bg-center rounded-2xl"
            style={{
              backgroundImage: `url(${BASE_URL}/uploads/promotion2.png)`,
            }}
            onClick={() => navigate("/category/consoles?page=1&brand=Sony")}
          />
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-40 sm:h-48 md:h-60 lg:h-72 xl:h-80 bg-cover bg-start rounded-2xl"
            style={{
              backgroundImage: `url(${BASE_URL}/uploads/promotion3.png)`,
            }}
            onClick={() => navigate("/category/headphones?page=1&brand=Sony")}
          />
        </SwiperSlide>
        <SwiperSlide>
          <div
            className="h-40 sm:h-48 md:h-60 lg:h-72 xl:h-80 bg-cover bg-center rounded-2xl"
            style={{
              backgroundImage: `url(${BASE_URL}/uploads/promotion4.png)`,
            }}
            onClick={() => navigate("/category/monitors")}
          />
        </SwiperSlide>
      </Swiper>
      <ProductSection heading="New Products" products={newProducts} />
      <ProductSection heading="Discover" products={randomProducts} />
      <ProductSection
        link="phones"
        heading="Phones"
        products={phones && phones.products.slice(0, 6)}
      />
      <ProductSection
        link="tabs"
        heading="Tabs"
        products={tabs && tabs.products.slice(0, 6)}
      />
      <ProductSection
        link="laptops"
        heading="Laptops"
        products={laptops && laptops.products.slice(0, 6)}
      />
    </main>
  );
};

export default Home;
