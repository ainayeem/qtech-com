import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "sonner";

//  {
//             "_id": "68722fea2fe65c64ed269582",
//             "imgUrl": "https://oasisfoods.onrender.com/media/product/small-1.png",
//             "title": "Fresh Black Grapes",
//             "price": 3.99,
//             "description": "Sweet and juicy black grapes with a deep flavor, perfect for snacking and salads.",
//             "quantity": 95,
//             "inStock": true,
//             "createdAt": "2025-07-12T09:50:34.713Z",
//             "updatedAt": "2025-07-12T09:50:34.713Z"
//         },

export interface ICartItem {
  product: string; // Product ID
  title: string;
  price: number;
  quantity: number;
  stock: number;
  imgUrl: string; // Optional: for displaying in the UI
}

interface CartState {
  items: ICartItem[];
  totalQuantity: number;
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartItem>) {
      const existingItem = state.items.find(
        (item) => item.product === action.payload.product
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
      state.totalQuantity += action.payload.quantity;
      state.totalPrice += action.payload.price * action.payload.quantity;
    },
    removeFromCart(state, action: PayloadAction<string>) {
      toast.warning("Item removed");
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.product === itemId);
      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.price * existingItem.quantity;
        state.items = state.items.filter((item) => item.product !== itemId);
      }
    },
    updateQuantity(
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product === id);
      if (existingItem && quantity > 0) {
        const quantityDifference = quantity - existingItem.quantity;
        existingItem.quantity = quantity;
        state.totalQuantity += quantityDifference;
        state.totalPrice += quantityDifference * existingItem.price;
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
