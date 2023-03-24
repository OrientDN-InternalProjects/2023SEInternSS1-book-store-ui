import { Box, Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { COLOR } from '../../constant';

const NotFound = () => {
	return (
		<Box display={'flex'} gap="18px" justifyContent={'center'} alignItems="center" height={'700px'}>
			<Heading fontSize={'50px'} fontWeight={'bold'} color={COLOR}>404</Heading>
			<Text mt="20px" fontSize={'25px'} color={COLOR} fontWeight={'light'}>Page Not found</Text>
		</Box>
	);
};

export default NotFound;