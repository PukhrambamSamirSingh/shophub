import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addToCart, decreaseQuantity, deleteItem, getCartItems, increaseQuantity } from "../reducerApi/cartApi"

const initialState = {
    items: [],
    loading: false,
    error: null
}
export const addToCartAsync = createAsyncThunk("cart/addtocartasync", async ({ userId, itemId, size, color, price }) => {
    try {
        const res = await addToCart({ userId, itemId, size, color, price })
        return res.data
    } catch (error) {
        throw new Error(error)
    }
})

export const getCartItemsAsync = createAsyncThunk("cart/getcartitems", async () => {
    try {
        const res = await getCartItems()
        return res.data
    } catch (error) {
        throw new Error(error)
    }
})

export const deleteCartItemAsync = createAsyncThunk("cart/deletecartitem", async (id) => {
    try {
        const res = await deleteItem(id)
        return res.data
    } catch (error) {
        throw new Error(error)
    }
})

export const increaseQuantityAsync = createAsyncThunk("cart/increaseitem", async (id) => {
    try {
        const res = await increaseQuantity(id)
        return res.data
    } catch (error) {
        throw new Error(error)
    }
})

export const decreaseQuantityAsync = createAsyncThunk("cart/decreaseitem", async (id) => {
    try {
        const res = await decreaseQuantity(id)
        return res.data
    } catch (error) {
        throw new Error(error)
    }
})

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.items.push(action.payload)
            })
            .addCase(getCartItemsAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(getCartItemsAsync.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
                state.error = null
            })
            .addCase(getCartItemsAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
                const { id } = action.payload
                state.items = state.items.filter(item => item._id !== id)
            })
            .addCase(increaseQuantityAsync.fulfilled, (state, action) => {
                const { id } = action.payload
                const items = state.items.map(item => {
                    if (item._id === id) {
                        item.quantity++
                    }
                    return item
                })
                state.items = items
            })
            .addCase(decreaseQuantityAsync.fulfilled, (state, action) => {
                const { id } = action.payload
                const items = state.items.map(item => {
                    if (item._id === id) {
                        item.quantity--
                    }
                    return item
                })
                state.items = items
            })
    }
})

export default cartSlice.reducer

