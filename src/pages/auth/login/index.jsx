import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input } from '@chakra-ui/react'
import style from './LoginPage.module.css'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COLOR } from '../../../constant'
import LoginPageViewModel from './LoginPageViewModel'
import useLocalStorage from '../../../hooks/useLocalStorage'

const LoginPage = () => {
  
  const email = useRef()
  const password = useRef()
  const { isSuccess, accessToken, saveToken, loginAsync } = LoginPageViewModel({
    email: email.current?.value
  })

  const handleSubmitLoginForm = (event) => {
    event.preventDefault()
    loginAsync({
      email: email.current?.value,
      password: password.current?.value
    })
  }

  useEffect(() => {
    saveToken({
      key: "accessToken",
      value: accessToken
    })
  }, [accessToken])
  
  return (
    <Container maxW={"container.sm"}>
      <Box bg = "gray.100" padding={[10, 10]} rounded="10px">
        <Heading color={COLOR}>Login</Heading>
        <Box mt={"20px"}> 
          <form onSubmit={handleSubmitLoginForm}>
            <Box display={"flex"} flexDirection="column" gap={"5px"}>
              <FormControl>
                <FormLabel color={COLOR}>Email</FormLabel>
                <Input type={"text"} ref={email} name="email" placeholder='email...' bg="white"/>
              </FormControl>
              <FormControl>
                <FormLabel color={COLOR}>Password</FormLabel>
                <Input type={"password"} ref={password} name="password" placeholder='password...' bg="white"/>
              </FormControl>
              <Box>
                <Button type='submit' colorScheme={"blue"} w={"100%"}>Login</Button>
              </Box>
              <p>{!isSuccess ? "fail" : "welcome back"}</p>
            </Box>
          </form>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginPage