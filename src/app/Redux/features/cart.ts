import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '@/type'

type CartState = CartItem[]

const initialState: CartState = []

export const cartSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    // add to cart functionality
    add(state, action: PayloadAction<Omit<CartItem, 'uuid'>>) {
      const uuid = Date.now() + Math.floor(Math.random() * 9000)
      const newobj: CartItem = { ...action.payload, uuid }
      state.push(newobj)
    },
    // delete from cart
    remove(state, action: PayloadAction<number>) {
      return state.filter((val) => val.uuid !== action.payload)
    },
    // increase quantity of item
    addition(state, action: PayloadAction<{ id: string; color: string; size: string }>) {
      const obj = state.find(
        (val) =>
          val.id === action.payload.id &&
          val.color === action.payload.color &&
          val.size === action.payload.size
      )
      if (obj) {
        obj.qty += 1
      }
    },
    // decrease quantity of item
    subtraction(state, action: PayloadAction<{ id: string; color: string; size: string }>) {
      const obj = state.find(
        (val) =>
          val.id === action.payload.id &&
          val.color === action.payload.color &&
          val.size === action.payload.size
      )
      if (obj && obj.qty > 1) {
        obj.qty -= 1
      }
    },
    // Action to clear the cart
    clearCart() {
      return []
    },
  },
})

export const { add, remove, subtraction, addition, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
