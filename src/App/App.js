import React, {useEffect} from 'react';
import {AnimatePresence} from 'framer-motion';
import {Route, Routes} from 'react-router-dom';
import {CreateContainer, MainContainer, Header} from '../component';
import {useStateValue} from '../context/StateProvider';
import {getAllFoodItems} from '../utils/firebaseFuncation';

const App = () => {
  const [, dispatch] = useStateValue();
  const fetchData = async () => {
    const data = await getAllFoodItems();
    dispatch({
      type: 'SET_FOOD_ITEMS',
      foodItems: data,
    });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className='w-screen h-auto flex flex-col bg-red-50'>
        <Header />

        <main className='mt-14 md:mt-20 px-4 py-4 md:px-16 w-full'>
          <Routes>
            <Route path='/*' element={<MainContainer />} />
            <Route path='/createItem' element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
};

export default App;
