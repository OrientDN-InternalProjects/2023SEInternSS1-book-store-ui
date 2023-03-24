import { OrderState } from "../initialState/orderState";
import { createSlice } from "@reduxjs/toolkit";
import { addOrderAsyncThunk, getOrderAsyncThunk, getOrderByCustomerIdAsyncThunk } from "../thunks/OrderThunk";

const orderSlice = createSlice({
  name: "order",
  initialState: OrderState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addOrderAsyncThunk.fulfilled, (state, action) => {
      state.isSuccess = action.payload.isSuccess,
      state.message = action.payload.message
    })

    builder.addCase(getOrderAsyncThunk.fulfilled, (state, action) => {
      state.order = action.payload
    })

    builder.addCase(getOrderByCustomerIdAsyncThunk.fulfilled, (state, action) => {
      state.order = action.payload
    })
  }
})

const orderReducer = orderSlice.reducer
const orderSelector = (state) => state.orderReducer

export {
  orderReducer,
  orderSelector
}