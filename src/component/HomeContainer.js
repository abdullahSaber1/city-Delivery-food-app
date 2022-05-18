import React from 'react';
import {heroData} from '../utils/data';

const HomeContainer = () => {
  return (
    <section
      className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full  h-full'
      id='home'>
      <div className='py-2 flex-1 flex flex-col items-start '>
        <div className='flex item-start gap-6 justify-center bg-orange-200 p-2 rounded-full px-4 py-1'>
          <p className='text-base text-orange-500 font-semibold'>Bike Delivery</p>
          <div className='w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl '>
            <img
              className='w-full h-full object-contain'
              src={`../img/delivery.png`}
              alt='delivery'
            />
          </div>
        </div>

        <p className='text-[2.5rem] md:text-[3.5rem] font-bold tracking-wide text-headingColor '>
          The Fastest Food Delivery in
          <span className='text-orange-600 text-[3rem] md:text-[4rem]'>
            Your City
          </span>
        </p>

        <p className='text-base text-textColor text-center hover:text-headingColor  cursor-pointer md:text-left md:w-[80%]'>
          lorem ipsum dolor sit amet, consectetur adipiscing elit. lorem ipsum dolor
          sit amet, consectetur adip,lorem ipsum dolor lorem ipsum dolor, consectetur
          adipiscing el
        </p>
        <button
          type='button'
          className='bg-gradient-to-br from-orange-400 to-orange-500 w-full md:w-auto px-4 py-2 mt-4  rounded-lg hover:shadow-lg transition-all duration-100 ease-in-out'>
          order Now
        </button>
      </div>

      <div className='py-2 flex-1 flex items-center justify-center relative '>
        <img
          src={`../img/heroBg.png`}
          alt='hero-bg'
          className='ml-auto h-420 w-full lg:w-auto lg:h-580'
        />

        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center py-4 flex-wrap lg:px-20  gap-4 drop-shadow-lg '>
          {heroData &&
            heroData.map((item) => (
              <div
                key={item.id}
                className='lg:w-190 p-4  bg-cardOverly backdrop-blur-md rounded-3xl flex  flex-col items-center justify-center mt-10 '>
                <img
                  src={item.img}
                  alt='ice-cream'
                  className='w-20 lg:w-40 -mt-10 lg:-mt-20 '
                />

                <p className='text-base lg:text-lg text-textColor font-semibold text-center mt-2 lg:mt-4'>
                  {item.name}
                </p>
                <p className='text-[10px] lg:text-sm text-lighttextGray font-semibold text-center md:text-left my-1 lg:my-3'>
                  {item.desp}
                </p>

                <p className='text-sm text-headingColor font-semibold'>
                  <span className='text-xs text-red-600'>$</span>
                  {item.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
