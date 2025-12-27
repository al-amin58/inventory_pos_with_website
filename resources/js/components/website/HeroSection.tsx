import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

const HeroSection: React.FC = () => {
  return (
    <section className="bg-[#FDFDFC] dark:bg-[#0a0a0a] py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 px-4">

        {/* LEFT: HERO CAROUSEL (75%) */}
        <div className="lg:col-span-9 rounded-2xl overflow-hidden">

          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            loop
            className="h-[420px]"
          >

            {/* Slide 1 */}
            <SwiperSlide>
              <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center">
                <div className="p-10 max-w-xl">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Upgrade Your Style Today
                  </h1>
                  <p className="mb-6 text-lg">
                    Discover fashion, electronics & more
                  </p>
                  <button className="bg-white text-purple-600 px-6 py-3 rounded-full font-semibold">
                    Shop Now
                  </button>
                </div>
                <img
                  src="/images/hero1.png"
                  className="hidden md:block h-[300px] ml-auto mr-8"
                />
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white flex items-center">
                <div className="p-10 max-w-xl">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Big Deals Everyday
                  </h1>
                  <p className="mb-6 text-lg">
                    Best prices for POS products
                  </p>
                  <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold">
                    View Deals
                  </button>
                </div>
                <img
                  src="/images/hero2.png"
                  className="hidden md:block h-[300px] ml-auto mr-8"
                />
              </div>
            </SwiperSlide>

          </Swiper>
        </div>

        {/* RIGHT: ADS (25%) */}
        <div className="lg:col-span-3 flex flex-col gap-6">

          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 h-[200px] flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold">Flash Sale</h3>
              <p className="text-sm text-gray-500">Up to 40% off</p>
            </div>
            <img src="/images/ad1.png" className="h-24 self-end" />
          </div>

          <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-6 h-[200px] flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold">New Products</h3>
              <p className="text-sm text-gray-500">Just arrived</p>
            </div>
            <img src="/images/ad2.png" className="h-24 self-end" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
