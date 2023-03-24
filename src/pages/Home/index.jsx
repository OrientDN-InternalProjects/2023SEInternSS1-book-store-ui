import React from 'react';
import Card from '../../components/Home/Card'
import { Box, Container, Image, Text, Flex, Icon, HStack} from '@chakra-ui/react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import HomeViewModel from './HomeViewModel';
import { COLOR } from '../../constant';
import { BiCheckDouble, BiCartAdd } from "react-icons/bi";
import { TbCoin } from "react-icons/tb"

const Home = () => {
	const { books } = HomeViewModel()
	const { booksBestSeller } = HomeViewModel()
	const { booksTopNew} = HomeViewModel()

	return (
		<Box bg={'gray.100'} minHeight = {"280vh"} pb={"100px"}>
			<Box>
				<Image src='https://res.cloudinary.com/duu07kasy/image/upload/v1679556399/Hi_Webcome_to_BookFast_o3md6l.png'/>
			</Box>
			<Box marginLeft={"250px"}>
				<Box marginLeft={"550px"} marginTop={"25px"} display={"flex"} gap={"10px"}>
					<Text fontSize="3xl" fontWeight={"bold"} color={COLOR} > Top 5 best seller </Text>
					<Icon as={TbCoin} color={"orange.400"} w={"40px"} h={"50px"}/>
				</Box>
				<Box mb="50px" display={"flex"} flexWrap="wrap" gap={"20px"} mt = "20px">
				{booksBestSeller.map(book => {
				return(
				<Card 
					productId={book.productId}
					productName={book.productName}  
					imageUrl = {book.images[0]?.imageURL} 
					productPrice = {book.productVariants[0]?.productSalePrice} 
					sold = {book.sold}
				/>
				)
				})}
				</Box>
			</Box>
			<Box>
				<Image src='https://res.cloudinary.com/duu07kasy/image/upload/v1679556653/There_are_many_new_book_models_1_zpgwuz.png'/>
			</Box>
			<Box marginLeft={"250px"}>
				<Box marginLeft={"550px"} marginTop={"25px"} display={"flex"} gap={"10px"}>
					<Text fontSize="3xl" fontWeight={"bold"} color={COLOR} > New Books</Text>
					<Icon as={BiCheckDouble} color={"green"} w={"50px"} h={"46px"}/>					
				</Box>
				<Box mb="50px" display={"flex"} flexWrap="wrap" gap={"20px"} mt = "20px">
				{booksTopNew.map(book => {
				return(
				<Card 
					productId={book.productId}
					productName={book.productName}  
					imageUrl = {book.images[0]?.imageURL} 
					productPrice = {book.productVariants[0]?.productSalePrice} 
					sold = {book.sold}
				/>
				)
				})}
				</Box>
			</Box>
			<Box>
				<Image src='https://res.cloudinary.com/duu07kasy/image/upload/v1679561195/Our_system_provide_cdd6uw.png'/>
			</Box>
			<Container
				mt={"50px"}
				maxW={"container.xl"}
			>
			<Box mb="100px" display={"flex"} flexWrap="wrap" gap={"50px"}>
				{books.map(book => {
				return(
				<Card 
					productId={book.productId}
					productName={book.productName}  
					imageUrl = {book.images[0]?.imageURL} 
					productPrice = {book.productVariants[0]?.productSalePrice} 
					sold = {book.sold}
				/>
				)
			})}
			</Box>
			</Container>
    </Box>
	);
};

export default Home;