import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProductAsync, getProductById, fetchMostProductBestSellerAsync, fetchTopNewProductsAsync } from "../../api/product";
import { URL } from "../../constant";

const fetchProductAsyncThunk = createAsyncThunk("product/fetch-product", async (payload) => {
  try {
    const response = await fetchProductAsync(URL)
    return response
  } catch (error) {
    console.log(error)
  }
})

const getProductByIdAsyncThunk = createAsyncThunk("product/get-product-id", async (payload) => {
  try {
    const { id } = payload
    const response = await getProductById(URL, id)
    return response
  } catch (error) {
    console.log(error)
  }
})

const fetchProductBestSellerAsyncThunk = createAsyncThunk("product/fetch-product-best-seller", async (payload) => {
  try {
    const response = await fetchMostProductBestSellerAsync(URL)
    return response
  } catch (error) {
    console.log(error)
  }
})

const fetchTopNewProductsAsyncThunk = createAsyncThunk("product/fetch-top-new-product", async (payload) => {
  try {
    const response = await fetchTopNewProductsAsync(URL)
    return response
  } catch (error) {
    console.log(error)
  }
})

export { fetchProductAsyncThunk, getProductByIdAsyncThunk, fetchProductBestSellerAsyncThunk, fetchTopNewProductsAsyncThunk }