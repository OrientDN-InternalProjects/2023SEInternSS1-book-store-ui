import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { redirect, useNavigate, useParams } from 'react-router-dom'
import { getOrderByCustomerIdAsync } from '../../api/order'
import useLocalStorage from '../../hooks/useLocalStorage'
import { orderSelector } from '../../stores/reducers/OrderReducer'
import { paymentSelector } from '../../stores/reducers/PaymentReducer'
import { getOrderAsyncThunk, getOrderByCustomerIdAsyncThunk } from '../../stores/thunks/OrderThunk'
import { createPaymentAsyncThunk } from '../../stores/thunks/PaymentThunk'

const OrderViewModel = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const { order } = useSelector(orderSelector)
  const { redirectUrl, isSuccess } = useSelector(paymentSelector)
  const navigate = useNavigate()
  const [ loading, setLoading ] = useState(true)
  const { get } = useLocalStorage()
  const [ reUrl, setReUrl ] = useState("")
  const accessTokenSaved = get({
    key: "accessToken"
  })

  useEffect(() => {
    setTimeout(() => {
      dispatch(getOrderByCustomerIdAsyncThunk({
        token: accessTokenSaved
      }))
    }, 1000)
    setLoading(false)
  }, [dispatch])

  const navigateToPaymentPage = async () => {
    dispatch(createPaymentAsyncThunk({
      orderId: order.orderId
    }))
  }

  useEffect(() => {
    if (isSuccess === true)
    {
      location.href = redirectUrl
    }

  }, [isSuccess, navigateToPaymentPage])

  return {
    order,
    loading,
    navigateToPaymentPage
  }
}

export default OrderViewModel