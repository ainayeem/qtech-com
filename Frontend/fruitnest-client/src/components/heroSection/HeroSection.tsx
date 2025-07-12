import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

import { Autoplay } from "swiper/modules";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Clock, CreditCard, Headset, TruckElectric } from "lucide-react";

const HeroSection = () => {
  const progressCircle = useRef<SVGSVGElement>(null);
  const progressContent = useRef<HTMLSpanElement>(null);

  const onAutoplayTimeLeft = (_swiper: SwiperType, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };
  return (
    <div>
      <div>
        <Swiper
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          onAutoplayTimeLeft={onAutoplayTimeLeft}
          loop={true}
          modules={[Autoplay]}
          className="mySwiper rounded-lg"
        >
          <SwiperSlide>
            <div className="pt-24 pb-52 px-20 bg-[url(/assets/images/hero-1.jpg)] bg-no-repeat bg-cover relative">
              <div className="bg-black/30 absolute inset-0"></div>
              <div className="relative z-10">
                <p className="font-semibold text-amber-400 uppercase">Fresh Selection</p>
                <h1 className="text-7xl font-bold my-5 -ml-2 text-white">Organic Fruits</h1>
                <h3 className="text-xl mb-16 text-white">
                  Starting from <span className="text-3xl font-semibold text-amber-400">$2.99</span> per pound
                </h3>
                <Link
                  to="/shop"
                  className="bg-amber-500 hover:bg-amber-600 transition-colors px-6 py-3 rounded-full text-white font-medium uppercase"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="pt-24 pb-52 px-20 bg-[url(/assets/images/hero-3.jpg)] bg-no-repeat bg-cover relative">
              <div className="bg-black/30 absolute inset-0"></div>
              <div className="relative z-10">
                <p className="font-semibold text-amber-400 uppercase">Seasonal Favorites</p>
                <h1 className="text-7xl font-bold my-5 -ml-2 text-white">Summer Berries</h1>
                <h3 className="text-xl mb-16 text-white">
                  <span className="text-3xl font-semibold text-amber-400">25% Off</span> All Berries
                </h3>
                <Link
                  to="/shop"
                  className="bg-amber-500 hover:bg-amber-600 transition-colors px-6 py-3 rounded-full text-white font-medium uppercase"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="pt-24 pb-52 px-20 bg-[url(/assets/images/hero-2.jpg)] bg-no-repeat bg-cover relative">
              <div className="bg-black/30 absolute inset-0"></div>
              <div className="relative z-10">
                <p className="font-semibold text-amber-400 uppercase">Limited Time</p>
                <h1 className="text-7xl font-bold my-5 -ml-2 text-white">Exotic Fruits</h1>
                <h3 className="text-xl mb-16 text-white">
                  Up to <span className="text-3xl font-semibold text-amber-400">30% Off</span> Selected Varieties
                </h3>
                <Link
                  to="/shop"
                  className="bg-amber-500 hover:bg-amber-600 transition-colors px-6 py-3 rounded-full text-white font-medium uppercase"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="mt-8 border border-gray-200 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 rounded shadow-sm">
        <div className="border-b lg:border-b-0 lg:border-r border-gray-200 p-4">
          <TruckElectric className="text-amber-500 mx-auto w-10 h-10" />
          <p className="text-center mt-3 mb-1 font-semibold">FREE DELIVERY</p>
          <p className="text-center text-gray-600">For all orders over $49</p>
        </div>
        <div className="border-b lg:border-b-0 lg:border-r border-gray-200 p-4">
          <Clock className="text-amber-500 mx-auto w-10 h-10" />
          <p className="text-center mt-3 mb-1 font-semibold">FRESH GUARANTEE</p>
          <p className="text-center text-gray-600">Farm to door within 24 hours</p>
        </div>
        <div className="border-b md:border-b-0 lg:border-r border-gray-200 p-4">
          <CreditCard className="text-amber-500 mx-auto w-10 h-10" />
          <p className="text-center mt-3 mb-1 font-semibold">SECURE PAYMENT</p>
          <p className="text-center text-gray-600">100% secure transactions</p>
        </div>
        <div className="p-4">
          <Headset className="text-amber-500 mx-auto w-10 h-10" />
          <p className="text-center mt-3 mb-1 font-semibold">24/7 SUPPORT</p>
          <p className="text-center text-gray-600">Dedicated customer service</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
