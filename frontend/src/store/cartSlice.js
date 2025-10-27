import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartItems: (state, action) => {
            state.cart = [...state.cart, ...action.payload]
        }
    }
})

export const {cartItems} = cartSlice.actions
export default cartSlice.reducer