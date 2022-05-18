import React, {useCallback, useState} from 'react';
import {MdShoppingBasket, MdAdd, MdLogout} from 'react-icons/md';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {getAuth, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

import {app} from '../firebase.config';
import {useStateValue} from '../context/StateProvider';
import {actionType} from '../context/reducer';

const Header = () => {
  const firebaseAuth = getAuth(app);

  const [{user, cartShow, cartItems}, dispatch] = useStateValue();

  const [isMenu, setMenu] = useState(false);

  const login = useCallback(async () => {
    if (!user) {
      const provider = new GoogleAuthProvider();

      const {
        user: {providerData},
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem('user', JSON.stringify(providerData[0]));
    } else {
      setMenu(!isMenu);
    }
  }, [firebaseAuth, dispatch, user, isMenu]);

  const logOut = useCallback(() => {
    if (user) localStorage.removeItem('user');
    setMenu(false);
    dispatch({type: actionType.SET_USER, user: null});
  }, [user, dispatch]);

  const showCart = useCallback(() => {
    dispatch({type: actionType.SET_CART_SHOW, cartShow: !cartShow});
  }, [dispatch, cartShow]);

  return (
    <div className='fixed z-50 w-screen p-3 px-4  bg-red-50  md:px-16'>
      {/* Desktop & tablet */}
      <div className='hidden md:flex w-full h-full p-4  items-center justify-between'>
        <Link to={'/'} className='flex items-center gap-2 '>
          <motion.img
            whileHover={{scale: 1.1}}
            src={`../img/logo.png`}
            className='w-8 object-cover'
            alt='logo'
          />
          <p
            className='text-headingColor text-x1 font-xl
          '>
            City Fast Food
          </p>
        </Link>

        <div className='flex items-center gap-8'>
          <motion.ul
            initial={{opacity: 0, x: 200}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 200}}
            className='flex items-center gap-8 transition-all duration-100 ease-linear '>
            <li
              className='text-base text-textColor hover:text-headingColor duration-50 transition-all ease-in-out cursor-pointer'
              onClick={() => setMenu(false)}>
              Home
            </li>
            <li
              className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'
              onClick={() => setMenu(false)}>
              Menu
            </li>
            <li
              className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'
              onClick={() => setMenu(false)}>
              About us
            </li>
            <li
              className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'
              onClick={() => setMenu(false)}>
              Service
            </li>
          </motion.ul>
          <div
            className='relative flex items-center justify-center'
            onClick={showCart}>
            <MdShoppingBasket className='text-textColor text-2xl' />
            {cartItems && cartItems.length > 0 && (
              <div className='absolute -top-3 -right-2 w-5 h-5 rounded-full bg-cartNum flex items-center justify-center'>
                <p className='text-white font-semibold text-xs'>
                  {cartItems.length}
                </p>
              </div>
            )}
          </div>

          <div className='relative'>
            <motion.img
              whileTap={{scale: 0.6}}
              src={user ? user.photoURL : `../img/avatar.png`}
              className='w-10 min-w-[40px] h-10 min-h-[40px] object-cover drop-shadow-2xl cursor-pointer rounded-full'
              alt='user'
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{opacity: 0, scale: 0.6}}
                animate={{opacity: 1, scale: 1}}
                exit={{opacity: 0, scale: 0.6}}
                className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute  right-0 top-12 '>
                {user && user.email === 'abdallhsaber9@gmail.com' && (
                  <Link
                    to={'/createItem'}
                    className='px-4 py-2 flex items-center justify-center gap-3 curser-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor  text-base'>
                    New Item
                    <MdAdd />
                  </Link>
                )}
                <p
                  className='px-4 py-2 flex items-center justify-center gap-3 
                cursor-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor  text-base'
                  onClick={logOut}>
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile */}
      <div className='flex md:hidden  items-center justify-between w-full h-full '>
        <div className='relative flex items-center justify-center'>
          <MdShoppingBasket className='text-textColor text-2xl' onClick={showCart} />
          {cartItems && cartItems.length > 0 && (
            <div className='absolute -top-3 -right-2 w-5 h-5 rounded-full bg-cartNum flex items-center justify-center'>
              <p className='text-white font-semibold text-xs'>{cartItems.length}</p>
            </div>
          )}
        </div>
        <Link to={'/'} className='flex items-center gap-2 '>
          <motion.img
            whileHover={{scale: 1.1}}
            src={`../img/logo.png`}
            className='w-8 object-cover'
            alt='logo'
          />
          <p
            className='text-headingColor text-x1 font-xl
          '>
            City
          </p>
        </Link>

        <div className='relative'>
          <motion.img
            whileTap={{scale: 0.6}}
            src={user ? user.photoURL : `../img/avatar.png`}
            className='w-10 min-w-[40px] h-10 min-h-[40px] object-cover drop-shadow-2xl cursor-pointer rounded-full'
            alt='user'
            onClick={login}
          />

          {isMenu && (
            <motion.div
              initial={{opacity: 0, scale: 0.6}}
              animate={{opacity: 1, scale: 1}}
              exit={{opacity: 0, scale: 0.6}}
              className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute  right-0 top-12 '>
              {user && user.email === 'abdallhsaber9@gmail.com' && (
                <Link
                  to={'/createItem'}
                  className='px-4 py-2 flex items-center  gap-3 curser-pointer hover:bg-slate-200 transition-all duration-100 ease-in-out text-textColor  text-base'>
                  New Item
                  <MdAdd />
                </Link>
              )}

              <motion.ul
                initial={{opacity: 0, x: 200}}
                animate={{opacity: 1, x: 0}}
                exit={{opacity: 0, x: 200}}
                className='flex  flex-col   transition-all duration-100 ease-linear '>
                <li className='text-base text-textColor hover:text-headingColor duration-50 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>
                  Home
                </li>
                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>
                  Menu
                </li>
                <li
                  className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer 
                hover:bg-slate-100 px-4 py-2'>
                  About us
                </li>
                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'>
                  Service
                </li>
              </motion.ul>
              <p
                className='px-4 rounded-md shadow-md py-2 flex items-center gap-3 
                cursor-pointer bg-gray-200 hover:bg-slate-200 justify-center transition-all duration-100 ease-in-out text-textColor  text-base'
                onClick={logOut}>
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
