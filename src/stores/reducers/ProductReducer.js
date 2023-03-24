import { createSlice } from "@reduxjs/toolkit";
import { fetchProductAsyncThunk, fetchProductBestSellerAsyncThunk, fetchTopNewProductsAsyncThunk, getProductByIdAsyncThunk } from "../thunks/ProductThunk";
import { productState } from "../initialState/ProductState";

const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductAsyncThunk.fulfilled, (state, action) => {
      state.books = action.payload
    }),
    builder.addCase(getProductByIdAsyncThunk.fulfilled, (state, action) => {
      state.book = action.payload
    })
    builder.addCase(fetchProductBestSellerAsyncThunk.fulfilled, (state, action) => {
      state.booksBestSeller = action.payload
    })
    builder.addCase(fetchTopNewProductsAsyncThunk.fulfilled, (state, action) => {
      state.booksTopNew = action.payload
    })
  }
})

const productReducer = productSlice.reducer
const productMostSellerReducer = productSlice.reducer
const productTopNewReducer = productSlice.reducer
const productTopNewSelector = (state) => state.productTopNewReducer
const productSelector = (state) => state.productReducer
const productMostSellerSelector = (state) => state.productMostSellerReducer

export { productReducer, productSelector, productMostSellerReducer, productMostSellerSelector, productTopNewReducer, productTopNewSelector }
