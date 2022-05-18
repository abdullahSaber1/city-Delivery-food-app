import React, {useCallback, useEffect, useState} from 'react';
import {MdOutlineKeyboardBackspace} from 'react-icons/md';
import {RiRefreshFill} from 'react-icons/ri';
import {motion} from 'framer-motion';
import {useStateValue} from '../context/StateProvider';
import CartItem from './CartItem';
import {actionType} from '../context/reducer';

const CartContainer = () => {
  const [{cartShow, cartItems, user}, dispatch] = useStateValue();
  const [total, setTotal] = useState(0);
  const [flag, setFlag] = useState(1);

  const closeCart = useCallback(() => {
    dispatch({type: 'SET_CART_SHOW', cartShow: !cartShow});
  }, [dispatch, cartShow]);

  useEffect(() => {
    let totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    setTotal(totalPrice);
  }, [cartItems, flag]);

  const clearCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEM,
      cartItems: [],
    });
    localStorage.setItem('cartItems', JSON.stringify([]));
  };

  return (
    <motion.div
      initial={{opacity: 0, x: 200}}
      animate={{opacity: 1, x: 0}}
      exit={{opacity: 0, x: 200}}
      className='fixed top-0 right-0 w-full md:w-340 h-screen bg-white drop-shadow-md flex flex-col z-[101]'>
      <div className='w-full flex items-center justify-between p-4 cursor-pointer'>
        <motion.div whileTap={{scale: 0.75}} onClick={closeCart}>
          <MdOutlineKeyboardBackspace className='text-textColor text-3xl' />
        </motion.div>
        <p className='text-textColor text-lg font-semibold'>Cart</p>
        <motion.p
          whileTap={{scale: 0.75}}
          onClick={clearCart}
          className='flex items-center gap-2 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md cursor-pointer text-textColor text-base'>
          Clear <RiRefreshFill />
        </motion.p>
      </div>

      {/* bottom Section */}
      {cartItems && cartItems.length > 0 ? (
        <div className='w-full h-full flex flex-col rounded-t-[2rem] bg-cartBg'>
          {/* cart Items Section */}
          <div className='w-full h-340  md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-auto scrollbar-none scroll-smooth'>
            {/* cart Items */}
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} flag={flag} setFlag={setFlag} />
            ))}
          </div>
          {/* Cart Total Section */}
          <div className='w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2'>
            <div className='w-full flex items-center justify-between'>
              <p className='text-gray-400 text-lg'>Sub Total</p>
              <p className='text-gray-400  text-lg'>$ {total}</p>
            </div>

            <div className='w-full flex items-center justify-between'>
              <p className='text-gray-400  text-lg'>Delivery</p>
              <p className='text-gray-400  text-lg'>$ 2.5</p>
            </div>

            <div className='w-full border-b border-gray-600 my-2'></div>
            <div className='w-full flex items-center justify-between'>
              <p className='text-gray-200 text-xl font-semibold'>Total</p>
              <p className='text-gray-200 text-xl font-semibold'>$ {total + 2.5}</p>
            </div>

            {user ? (
              <motion.button
                whileTap={{scale: 0.8}}
                type='button'
                className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-1g my-2
             hover:shadow-lg '>
                Check Out
              </motion.button>
            ) : (
              <motion.button
                whileTap={{scale: 0.8}}
                type='button'
                className='w-full p-2 rounded-full bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-1g my-2
             hover:shadow-lg '>
                Log In to Check Out
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className='w-full h-full flex flex-col items-center justify-center gap-6'>
          <img src={`../img/emptyCart.svg`} className='w-300' alt='' />
          <p className='text-xl text-textColor font-semibold'>
            Add some items to your cart
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default CartContainer;
