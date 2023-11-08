import { configureStore } from "@reduxjs/toolkit"
import itemReducer from "../slices/itemSlice"
import cartReducer from "../slices/cartSlice"

export const store = configureStore({
    reducer: {
        item: itemReducer,
        cart: cartReducer
    },
    devTools: false
})
