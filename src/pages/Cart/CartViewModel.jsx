import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useLocalStorage from '../../hooks/useLocalStorage';
import { cartSelector } from '../../stores/reducers/CartReducer';
import { orderSelector } from '../../stores/reducers/OrderReducer';
import { fetchCartAsyncThunk } from '../../stores/thunks/CartThunk';
import { addOrderAsyncThunk, getOrderAsyncThunk, getOrderByCustomerIdAsyncThunk } from '../../stores/thunks/OrderThunk';
import { createPaymentAsyncThunk } from '../../stores/thunks/PaymentThunk';
import { paymentSelector } from '../../stores/reducers/PaymentReducer';

const CartViewModel = () => {
	const [ quantity, setQuantity ] = useState(0);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { get } = useLocalStorage();
	const [ prepareOrderProduct, setPrepareOrderProduct ] = useState([])
	const [ prepareToAddOrderProducts, setPrepareToAddOrderProduct ] = useState([])
	const { redirectUrl, isSuccess, orderId }  = useSelector(orderSelector)
	const params = useParams();
	const { carts } = useSelector(cartSelector);
	const [ message, setMessage ] = useState("")
	const accessTokenSaved = get({
		key: 'accessToken'
	});

	const inputHandle = (event) => {
		setMessage(event.target.value)
	}

	useEffect(() => {
		if (!accessTokenSaved) navigate("/login")
	}, [accessTokenSaved])

	useEffect(() => {
		dispatch(fetchCartAsyncThunk({
			token: accessTokenSaved,
			userId: params.userId
		}));
	}, [accessTokenSaved, dispatch]);

	const selectProductAddToOrder = ({ id, title, variant, quantity, total }, event) => {
		if (event.target.checked === true)
		{
			setPrepareOrderProduct([...prepareOrderProduct, { id, title, variant, quantity, total }])
			setPrepareToAddOrderProduct([...prepareToAddOrderProducts, { productVariantId: id, quantity }])
		} 
		else
		{
			setPrepareOrderProduct(prepareOrderProduct.filter(product => product.id !== id))
			setPrepareToAddOrderProduct(prepareToAddOrderProducts.filter(product => product.productVariantId !== id))
		}
	};

	console.log(prepareToAddOrderProducts)

	const increase = () => {
		setQuantity(quantity + 1);
	};

	const decrease = () => {
		setQuantity(quantity - 1);
	};

	const getTotalInCart = (cart) => {
		const initialValue = 0
		const totalPrice = cart.reduce((first, current) => first + current.total, initialValue)
		return totalPrice
	}

	useEffect(() => {
		if (quantity < 1)
		{
			setQuantity(0);
		}
	}, [quantity]);

	const createOrderAsync = ({
		details,
	}) => {
		dispatch(addOrderAsyncThunk({
			token: accessTokenSaved,
			data: {
				transferAddress: "Base on paypal",
				paymentMethodId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
				message,
				details
			}
		}))
		setTimeout(() => {
			navigate("/order")
		}, 2000)
	}

	return {
		message,
		quantity,
		increase,
		decrease,
		carts,
		selectProductAddToOrder,
		getTotalInCart,
		prepareOrderProduct,
		createOrderAsync,
		prepareToAddOrderProducts,
		inputHandle,
		quantity,
		setQuantity
	};
};

export default CartViewModel;