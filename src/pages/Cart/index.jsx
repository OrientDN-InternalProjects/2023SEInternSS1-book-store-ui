import { Icon, Container, Text, Heading, HStack, Table, TableContainer, Tbody, Td, Th, Thead, Tr, Button, Input, Checkbox, Flex, Box, Textarea } from '@chakra-ui/react';
import React from 'react';
import { COLOR } from '../../constant';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import CartViewModel from './CartViewModel';
import { BsPaypal } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
	const navigate = useNavigate()
	const { 
		carts, 
		increase, 
		decrease, 
		selectProductAddToOrder,
		getTotalInCart,
		prepareOrderProduct,
		createOrderAsync,
		prepareToAddOrderProducts,
		inputHandle,
		quantity,
		setQuantity
	} = CartViewModel();

	const total = getTotalInCart(prepareOrderProduct)

	return (
		<Box ml={"50px"}>
			<Flex justifyContent={"center"} gap={"100px"} flexWrap={"wrap"}>
				<TableContainer mt="20px" w={"50%"}>
					<Table variant={'simple'}>
						<Thead>
							<Tr>
								<Th></Th>
								<Th>Product name</Th>
								<Th>Item</Th>
								<Th>Quantity</Th>
								<Th>Total</Th>
							</Tr>
						</Thead>
						<Tbody>
							{carts.map(cart => {
								return (
									<Tr>
										<Td>
											<Checkbox
												onChange={(event) => selectProductAddToOrder({
													id: cart.productVariantId,
													title: cart.productName,
													variant: cart.productVariantName,
													quantity: cart.quantity,
													total: cart.total
												}, event)}
											></Checkbox>
										</Td>
										<Td>
											<HStack>
												<Text color={COLOR} fontWeight={'medium'}>{cart.productName}</Text>
											</HStack>
										</Td>
										<Td>
											<HStack>
												<Text color={COLOR} fontWeight={'medium'}>{cart.productVariantName}</Text>
											</HStack>
										</Td>
										<Td>
											<HStack>
												<Button 
													size={'sm'}
													onClick={decrease}
												>
													<Icon as={AiOutlineMinus}/>
												</Button>
												<Input 
													value={cart.quantity}
													defaultValue={cart.quantity}
													type={'number'} 
													width={'19%'} 
												/>
												<Button 
													size={'sm'}
													onClick={increase}
												>
													<Icon as={AiOutlinePlus}/>
												</Button>
											</HStack>
										</Td>
										<Td>{cart.total} $</Td>
									</Tr>
								);
							})}
						</Tbody>
					</Table>
				</TableContainer>
				<Box padding={"20px"} bg={'hwb(180 82% 0%)'} w="400px" mt="20px" position={"relative"}>
					<Text fontSize={"20px"} color={COLOR} fontWeight={"semibold"}>Preview your order</Text>
					{prepareOrderProduct.map(product => {
						return (
							<Box mt="5px" padding={"20px"} border={"white 1px solid"}>
								<Text fontWeight={"medium"} color={COLOR}>{product.title}</Text>
								<Text fontWeight={"light"} color={COLOR}>{product.variant}</Text>
								<Text fontWeight={"light"} color={COLOR}>Quantity: {product.quantity}</Text>
								<Text mt="10px" fontWeight={"medium"}>{product.total} $</Text>
							</Box>
						)
					})}
					<Text color={COLOR} fontWeight={"bold"} mt="10px">Total: {total} $</Text>
					<Box mt="10px">
						<Textarea onChange={inputHandle} placeholder='message...' bg={"white"}/>
					</Box>
					<Button 
						mt="10px"
						bg={COLOR} 
						color="white" 
						mb="10px"
						width={"100%"}
						onClick={() => {
							createOrderAsync({
								details: prepareToAddOrderProducts
							})
						}}
						>Create order</Button>
				</Box>
			</Flex>
		</Box>
	);
};

export default Cart;