import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { deleteItem, fetchItems } from "../reducerApi/itemApi"

const initialState = {
    loading: false,
    items: [],
    error: null
}

export const fetchItemsAsync = createAsyncThunk("item/fetchitemsasync", async () => {
    try {
        const res = await fetchItems()
        return res.data
    } catch (error) {
        throw new Error(error);
    }
})

export const deleteItemAsync = createAsyncThunk("item/deleteitemasync", async (id) => {
    try {
        const res = await deleteItem(id)
        return res.data
    } catch (error) {
        throw new Error(error);
    }
})

const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchItemsAsync.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchItemsAsync.fulfilled, (state, action) => {
                state.loading = false
                state.items = action.payload
                state.error = null
            })
            .addCase(fetchItemsAsync.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(deleteItemAsync.fulfilled, (state, action) => {
                const { id } = action.payload
                state.items = state.items.filter(item => item?._id !== id)
            })
    }
})

export default itemSlice.reducer