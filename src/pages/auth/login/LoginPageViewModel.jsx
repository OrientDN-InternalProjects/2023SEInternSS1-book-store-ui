import { useEffect, useLayoutEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import useLocalStorage from '../../../hooks/useLocalStorage'
import { authSelector } from '../../../stores/reducers/AuthReducer'
import { loginAsyncThunk } from '../../../stores/thunks/AuthThunk'

const LoginPageViewModel = ({ email }) => {
  const dispatch = useDispatch()
  const params = useParams()
  const navigate = useNavigate()
  const { set, get } = useLocalStorage()
  const { isSuccess, isActive, message, accessToken, refreshToken } = useSelector(authSelector)
  const savedAccessToken = get({
    key: "accessToken"
  })

  const loginAsync = ({ email, password }) => {
    dispatch(loginAsyncThunk({
      email,
      password
    }))
  }

  useEffect(() => {
    savedAccessToken ? navigate("/") : navigate("/login")
  }, [savedAccessToken])

  useEffect(() => {
    if (isSuccess)
    {
      window.location.href = "/home"
    } 
    if (isActive === false)
    {
      navigate(`/verify/${email}`)
    }
  }, [isSuccess, isActive])

  const saveToken = ({ key, value }) => {
    set({
      key,
      value
    })
  }

  return {
    isActive,
    isSuccess,
    message,
    accessToken,
    refreshToken,
    loginAsync,
    saveToken
  }
}

export default LoginPageViewModel