import {fetchUser, fetchItems} from '../utils/fetchDataFromLocalStorage';

const userInfo = fetchUser();
const cartItems = fetchItems();

export const initalState = {
  user: userInfo,
  foodItems: [],
  cartShow: false,
  cartItems,
};
