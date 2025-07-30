import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartMenuValue: 0,

};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartMenuValue: (state, action) => {
      state.cartMenuValue = action.payload;
    }
    // Add a refreshSessionId action
  
  },
});

export const { setCartMenuValue } = cartSlice.actions;
export default cartSlice.reducer;