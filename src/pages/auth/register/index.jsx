import React, { useRef } from 'react';
import RegisterViewModel from './RegisterViewModel';
import style from './Register.module.css';
import { Heading } from '@chakra-ui/react';
import { COLOR } from '../../../constant';

const RegisterPage = () => {
	const { isSuccess, message, registerAsync } = RegisterViewModel();
	const username = useRef();
	const email = useRef();
	const password = useRef();

	const handleSubmitRegisterForm = (event) => {
		event.preventDefault();
		registerAsync({
			username: username.current?.value,
			email: email.current?.value, 
			password: password.current?.value
		});
	};

	return (
		<div className={style.container}>
			<form className={style.form} onSubmit={handleSubmitRegisterForm}>
				<Heading mb = "20px" color={COLOR}>
            Register
				</Heading>
				<input ref={username} type="text" placeholder="Username" name="username" required />
				<input ref={email} type="email" placeholder="Email" name="email"   required />
				<input ref={password} type="password" placeholder="********" name="password"  required />
				<p>{message}</p>
				<button type="submit">Register</button>
			</form>
		</div>
	);
};

export default RegisterPage;