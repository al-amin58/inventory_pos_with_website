import React from 'react';

import HeroSection from '../components/website/HeroSection';
import Categories from '../components/website/Categories';
import FeaturedProducts from '../components/website/FeaturedProducts';
import DailyDeals from '../components/website/DailyDeals';
import BestSelling from '../components/website/BestSelling';
import NewArrivals from '../components/website/NewArrivals';
import Newsletter from '../components/website/Newsletter';




export default function Welcome() {
    
    return (
        <>
            <div className=" bg-[#FDFDFC] px-5 dark:bg-[#0a0a0a]">
                
                
                <HeroSection />
                <Categories />
                <FeaturedProducts />
                <DailyDeals />
                <BestSelling />
                <NewArrivals />
                <Newsletter />
                
            </div>

        </>
    );
}

 