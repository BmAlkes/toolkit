import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = `https://course-api.com/react-useReducer-cart-project`;

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.error(err));
});

const cartSlicer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      return { cartItems: [] };
    },
    removeItems: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => {
        return item.id != itemId;
      });
    },
    increaseItems: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount + 1;
    },
    decreaseItems: (state, { payload }) => {
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      cartItem.amount = cartItem.amount - 1;
      if (cartItem.amount <= 0) {
        cartItem.amount = cartItem.amount = 0;
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((cartItem) => {
        amount += cartItem.amount;
        total += cartItem.amount * cartItem.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state) => {
      state.isLoading = false;
    },
  },
});

export default cartSlicer.reducer;
export const {
  clearCart,
  removeItems,
  decreaseItems,
  increaseItems,
  calculateTotals,
} = cartSlicer.actions;
