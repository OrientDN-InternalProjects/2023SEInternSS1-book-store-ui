import { useDisclosure } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import AlertLoginModal from './components/AlertLoginModal';
import useLocalStorage from './hooks/useLocalStorage';
import LoginPage from './pages/auth/login';
import RegisterPage from './pages/auth/register';
import Cart from './pages/Cart';
import Home from './pages/Home';
import NotFound from './pages/NotFound/NotFound';
import Order from './pages/Order';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';
import VerifyAccount from './pages/VerifyAccount';

const App = () => {

	const { remove, get } = useLocalStorage()
	const accessTokenSaved = get({
		key: "accessToken"
	})
	const { onClose, onOpen, isOpen } = useDisclosure()
	const navigate = useNavigate()

	useEffect(() => {
		if (accessTokenSaved)
		{
			setTimeout(() => {
				remove({
					key: "accessToken"
				})
				onOpen()
			}, 180000)
		}
	}, [])

	return (
		<div>
			<AlertLoginModal 
				title={"Alert"}
				body={"your session has timed out"}
				isOpen={isOpen}
				onClose={onClose}
				reLogin={() => {
					onClose()
					window.location.href = "/login"
				}}
				close={() => {
					onClose()
					window.location.reload()
				}}
			/>
			<Routes>
				<Route index path='/' element={<Home />} />
				<Route path='login' element={<LoginPage />}></Route>
				<Route path='register' element={<RegisterPage />}></Route>
				<Route path='home' element={<Home />}></Route>
				<Route path='product/:id' element={<ProductDetail />}></Route>
				<Route path='verify/:email' element={<VerifyAccount />}></Route>
				<Route path='cart/:userId' element={<Cart />}></Route>
				<Route path='*' element={<NotFound />}></Route>
				<Route path='/order' element={<Order />}></Route>
				<Route path='/search/:keyword' element={<Search />}></Route>
			</Routes>
		</div>
	);
};

export default App;