import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { authSelector } from '../../stores/reducers/AuthReducer';
import { customerSelector } from '../../stores/reducers/CustomerReducer';
import { getUserLoggedAsyncThunk } from '../../stores/thunks/AuthThunk';
import { customerThunk } from '../../stores/thunks/CustomerThunk';
import { fetchCartAsyncThunk } from '../../stores/thunks/CartThunk';

const NavbarViewModel = () => {
	const { isSuccess, email, id } = useSelector(authSelector);
	const { customerFullName, customerId } = useSelector(customerSelector);
	const { get, remove } = useLocalStorage();
	const navigate = useNavigate()
	const dispatch = useDispatch();
	const accessTokenSaved = get({
		key: 'accessToken'
	});

	useEffect(() => {
		dispatch(getUserLoggedAsyncThunk({
			accessToken: accessTokenSaved
		}));
	}, [accessTokenSaved, dispatch]);

	useEffect(() => {
		dispatch(customerThunk({
			accessToken: accessTokenSaved
		}));
	}, [isSuccess, dispatch]);

	const signOut = () => {
		remove({ 
			key: "accessToken"
		})
		window.location.reload();
	};

	useEffect(() => {
		dispatch(fetchCartAsyncThunk({
			token: accessTokenSaved,
			userId: customerId
		}));
	}, [dispatch, accessTokenSaved, customerId])

	return {
		isSuccess,
		email,
		id,
		signOut,
		customerFullName,
		customerId,
		accessTokenSaved
	};
};

export default NavbarViewModel;