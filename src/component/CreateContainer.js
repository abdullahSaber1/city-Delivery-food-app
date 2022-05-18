/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {motion} from 'framer-motion';

import {
  MdCloudUpload,
  MdFastfood,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from 'react-icons/md';

import {catagories} from '../utils/data';
import Loader from './Loader';
import {storage} from '../firebase.config';
import {getAllFoodItems, saveNewFood} from '../utils/firebaseFuncation';

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import {useStateValue} from '../context/StateProvider';

const CreateContainer = () => {
  const [title, setTitle] = useState('');
  const [calories, setCalories] = useState('');
  const [price, setPrice] = useState('');
  const [catagory, setCatagory] = useState(null);
  const [imageAssert, setImageAssert] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState('');
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [, dispatch] = useStateValue();

  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);

    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setAlertStatus('danger');
        setMsg('Error in uploading image : Please try again');
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAssert(downloadURL);
          setFields(true);
          setIsLoading(false);
          setMsg('Image uploaded successfully');
          setAlertStatus('success');
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };

  // Delete image Uploaded
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAssert);
    deleteObject(deleteRef).then(() => {
      setImageAssert(null);
      setIsLoading(false);
      setFields(true);
      setMsg('Image deleted successfully ');
      setAlertStatus('success');
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  const saveDetails = () => {
    try {
      if (
        (title === '' || calories === '' || price === '' || catagory === null) &&
        imageAssert === null
      ) {
        setFields(true);
        setAlertStatus('danger');
        setMsg('Please fill all the fields');
        setTimeout(() => {
          setFields(false);
        }, 4000);
      } else {
        const data = {
          id: Date.now(),
          title,
          img: imageAssert,
          catagory,
          qty: 1,
          calories,
          price,
        };
        saveNewFood(data);
        setFields(true);
        setIsLoading(false);
        clearData();
        setMsg('Data saved successfully');
        setAlertStatus('success');
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setAlertStatus('danger');
      setMsg('Error in Save Data : Please try again');
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
    fetchData();
  };

  const clearData = () => {
    setTitle('');
    setCalories('');
    setPrice('');
    setCatagory(catagory);
    setImageAssert(null);
  };
  const fetchData = async () => {
    const data = await getAllFoodItems();
    dispatch({
      type: 'SET_FOOD_ITEMS',
      foodItems: data,
    });
  };

  return (
    <div className='w-full h-screen md:h-auto flex items-center  justify-center '>
      <div className='w-[90%] md:w-[75%] border border-gray-300 rounded-lg p-4 flex items-center justify-center flex-col gap-4'>
        {fields && (
          <motion.p
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            className={`w-full p-2 rounded-lg text-center text-semibold text-lg ${
              alertStatus === 'danger'
                ? 'bg-red-400 text-red-800 '
                : 'bg-emerald-400 text-emerald-800'
            }`}>
            {msg}
          </motion.p>
        )}
        <div className='w-full py-2 border-b border-gray-300 flex item-center gap-2'>
          <MdFastfood className='text-xl text-gray-700' />
          <input
            type='text'
            required
            value={title}
            placeholder='title'
            onChange={(e) => setTitle(e.target.value)}
            className='w-full h-full text-lg bg-transparent font-semibold text-textColor outline-none'
          />
        </div>
        <div className='w-full'>
          <select
            onChange={(e) => setCatagory(e.target.value)}
            className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'>
            <option value='other' className='bg-white'>
              Select Category
            </option>
            {catagories &&
              catagories.map((cat) => (
                <option
                  key={cat.id}
                  value={cat.urlParamName}
                  className='text-base outline-none capitalize bg-white text-headingColor '>
                  {cat.name}
                </option>
              ))}
          </select>
        </div>
        <div className='group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 curser-pointer rounded-lg'>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAssert ? (
                <label className='w-full h-full flex flex-col items-center justify-center '>
                  <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
                    <MdCloudUpload className='text-gray-500 text-3xl hover:text-gray-700' />
                    <p className='text-gray-500 hover:text-gray-700'>
                      click here to upload
                    </p>
                  </div>
                  <input
                    type='file'
                    name='uploadImage'
                    onChange={uploadImage}
                    className='w-0 h-0 opacity-0 cursor-pointer'
                  />
                </label>
              ) : (
                <>
                  <div className='relative h-full '>
                    <img
                      src={imageAssert}
                      alt='uploadedImage'
                      className='w-full h-full object-cover'
                    />
                    <button
                      type='button'
                      className='absolute bottom-3 right-3 p-3 rounded-fullb bg-red-500 text-xl curser-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out rounded-full '
                      onClick={deleteImage}>
                      <MdDelete className='text-white' />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className='w-full flex flex-col md:flex-row items-center gap-3'>
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdFoodBank className='text-2xl text-gray-700' />
            <input
              type='text'
              placeholder='Calories'
              required
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
              className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor'
            />
          </div>
          <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
            <MdAttachMoney className='text-2xl text-gray-700' />
            <input
              type='text'
              placeholder='Price'
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className='w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor'
            />
          </div>
        </div>

        <div className='flex items-center w-full h-full '>
          <button
            type='button'
            className='ml-0 md:ml-auto w-full md:w-auto  
             border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-1g text-white font-semibold'
            onClick={saveDetails}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
