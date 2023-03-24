import { createSlice } from '@reduxjs/toolkit';
import { cartState } from '../initialState/CartState';
import { addProductToCartAsyncThunk, fetchCartAsyncThunk } from '../thunks/CartThunk';

const cartSlice = createSlice({
	name: 'cart',
	initialState: cartState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCartAsyncThunk.fulfilled, (state, action) => {
			if (action.payload === undefined)
			{
				state.carts = []
			} else {
				state.carts = action.payload
			}
		});

		builder.addCase(addProductToCartAsyncThunk.fulfilled, (state, action) => {
			state.isSuccess = action.payload.isSuccess
		})
	}
});

const cartReducer = cartSlice.reducer;
const cartSelector = (state) => state.cartReducer;

export { cartReducer, cartSelector };