import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authSelector } from '../../../stores/reducers/AuthReducer';
import { registerAsyncThunk } from '../../../stores/thunks/AuthThunk';

const RegisterViewModel = () => {
	const dispatch = useDispatch();
	const { isSuccess, message } = useSelector(authSelector);
  
	const registerAsync = ({ username, email, password }) => {
		try {
			dispatch(registerAsyncThunk({
				username,
				email,
				password
			}));
		} catch (error) {
			console.log(error);
		}
	};
	return {
		isSuccess,
		message,
		registerAsync
	};
};

export default RegisterViewModel;