import React, {useCallback, useEffect, useRef, useState} from 'react';
import {MdShoppingBasket} from 'react-icons/md';
import {motion} from 'framer-motion';
import {useStateValue} from '../context/StateProvider';
import {actionType} from '../context/reducer';

const RowContainer = ({flag, data, scrollValue}) => {
  const rowContainerRef = useRef();
  const [{cartItems}, dispatch] = useStateValue();
  const [items, setItems] = useState([]);

  // console.log(cartItems);

  useEffect(() => {
    rowContainerRef.current.scrollLeft += scrollValue;
  });

  const addItem = useCallback(
    (item) => {
      if (!cartItems.includes(item)) setItems([...cartItems, item]);
    },
    [cartItems]
  );

  const addTocart = useCallback(() => {
    dispatch({
      type: actionType.SET_CART_ITEM,
      cartItems: items,
    });
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [dispatch, items]);

  useEffect(() => {
    addTocart();
  }, [items, addTocart]);

  return (
    <div
      ref={rowContainerRef}
      className={`w-full bg-rowBg flex items-center gap-3 my-12 scroll-smooth ${
        flag
          ? 'overflow-x-scroll scrollbar-none'
          : 'overflow-x-hidden flex-wrap justify-center'
      }`}>
      {data && data.length > 0 ? (
        data.map((item) => (
          <div
            key={item.id}
            className='w-300 min-w-[300px] h-[225px] md:w-340 md:min-w-[340px] bg-gray-100 rounded-lg my-12 p-2 shadow-md backdrop-blue-lg hover:drop-shadow-lg flex flex-col items-center justify-between'>
            <div className='w-full flex items-center justify-between'>
              <motion.div
                whileHover={{scale: 1.2}}
                className='h-40 w-40 -mt-8 drop-shadow-lg'>
                <img
                  src={item.img}
                  alt=''
                  className='w-full h-full object-contain'
                />
              </motion.div>

              <motion.div
                whileTap={{scale: 0.75}}
                className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer hover:shadow-md'
                onClick={() => addItem(item)}>
                <MdShoppingBasket className='text-white' />
              </motion.div>
            </div>
            <div className='w-full flex flex-col items-end justify-end'>
              <p className='text-textColor font-semibold text-base md:text-lg '>
                {item.title}
              </p>
              {item.calories && (
                <p className='mt-1 text-sm text-gray-500 '>
                  {item.calories} Calories
                </p>
              )}

              <div className='flex items-center gap-8'>
                <p className='text-lg text-headingColor font-semibold'>
                  <span className='text-sm text-red-500'>$</span>
                  {item.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className='w-full flex flex-col items-center justify-center'>
          <img src={`../img/NotFound.svg`} alt={`Not Found`} className='h-340' />
          <p className='text-xl text-headingColor font-semibold'>
            Items Not Available.
          </p>
        </div>
      )}
    </div>
  );
};

export default RowContainer;
