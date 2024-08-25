import { CartItem, MenuItem } from '@/types';
import {PayloadAction, createSlice} from '@reduxjs/toolkit';

var initialState = [] as CartItem[];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<MenuItem>) {
      const menuItem = action.payload;

      //If existing card doesn't belong to the same outlet, then clear previous items.
      if(state.length > 0 && state[0].menuItem.outletId !== menuItem.outletId) {
        state.splice(0, state.length);
      }

      const itemIndex = state.findIndex(item => item.menuItem.id === menuItem.id);

      if (itemIndex >= 0) {
        state[itemIndex].quantity += 1;
        state[itemIndex].totalPrice = state[itemIndex].menuItem.price * state[itemIndex].quantity;
      } else {
        const newCartItem: CartItem = {
          id: menuItem.id,
          menuItem,
          quantity: 1,
          totalPrice: menuItem.price,
        };
        state.push(newCartItem);
      }
    },
    
    removeFromCart(state, action: PayloadAction<string>) {
      const itemIndex = state.findIndex(item => item.id === action.payload);
      
  
      if (itemIndex >= 0) {
        const item = state[itemIndex];
        
        if (item.quantity === 1) {
          state.splice(itemIndex, 1);
        } else {
          item.quantity -= 1;
          item.totalPrice -= item.menuItem.price;
        }
      }
    },

    clearCart(state, action: PayloadAction<undefined>) {
      state.splice(0, state.length);
    },
  },
});

export const {addToCart, removeFromCart, clearCart} = cartSlice.actions;

export default cartSlice.reducer;
