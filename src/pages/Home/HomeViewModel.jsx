import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { productMostSellerSelector, productSelector, productTopNewSelector } from '../../stores/reducers/ProductReducer';
import { fetchProductAsyncThunk, fetchProductBestSellerAsyncThunk, fetchTopNewProductsAsyncThunk } from '../../stores/thunks/ProductThunk';

const HomeViewModel = () => {
	const dispatch = useDispatch()
	const { books } = useSelector(productSelector)
	const { booksBestSeller } = useSelector(productMostSellerSelector)
	const { booksTopNew } = useSelector(productTopNewSelector)

	useEffect(() => {
		dispatch(fetchProductAsyncThunk(null))
		dispatch(fetchProductBestSellerAsyncThunk(null))
		dispatch(fetchTopNewProductsAsyncThunk(null))
	}, [dispatch])
	return {
		books, 
		booksBestSeller,
		booksTopNew
	}
};

export default HomeViewModel;