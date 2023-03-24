import { Box, Image, Text} from '@chakra-ui/react'
import React from 'react'
import { COLOR } from '../../constant'
import { Link, useNavigate } from 'react-router-dom'

const Card = ({ imageUrl, productName, productPrice, productId, sold}) => {

    const navigate = useNavigate()

    return (
        <Box onClick={() => {
            navigate(`/product/${productId}`)
        }} _hover={{
          boxShadow: `0px 20px 30px gray`,
          transition: "0.2s",
          bg : "gray.100",
        }} width={'250px'} height={'360px'} bg={'white'}>
            <Box width='300px'>
                <Image src={imageUrl} height='290px' width='250px' />
            </Box>
            <Box marginLeft={'5px'}>
                <Text ml="5px" mt="5px" color={"black"} fontSize = {'20px'} fontWeight='semibold' as='h4' lineHeight='tight'noOfLines={1} _hover={{
                    color : "tomato"
                }}>
                    <Link to={`/product/${productId}`} >{productName}</Link>
                </Text>
                <Box ml="5px" mt="20px" mb="10px" fontSize='15px' display={'flex'} gap={'80px'} marginTop={'1px'}>
                    <Text fontWeight={"medium"} color={"tomato"} fontSize='20px' >{productPrice} $</Text>
                    <Text fontWeight={"light"} marginTop={'5px'}>Sold: {sold} product</Text>
                </Box>
            </Box>
        </Box>
    )
}

export default Card
