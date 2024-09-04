import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  items: [],
  allItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        toast.success("Item already exists");
      } else {
        const newItem = { ...action.payload };
        state.items.push(newItem);
        toast.success("Item added successfully");
      }
    },

    removeItemFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      toast.info("Item Removed successfully");
    },

    clearCart: (state) => {
      state.items = [];
      toast.info("cart clear successfully");
    },
    addAllItem: (state, action) => {
      state.allItems = action.payload;
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart ,addAllItem } =
  cartSlice.actions;
export default cartSlice.reducer;
