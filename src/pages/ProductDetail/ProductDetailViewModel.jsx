import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import useLocalStorage from '../../hooks/useLocalStorage'
import { productSelector } from '../../stores/reducers/ProductReducer'
import { addProductToCartAsyncThunk } from '../../stores/thunks/CartThunk'
import { getProductByIdAsyncThunk } from '../../stores/thunks/ProductThunk'
import { useToast } from '@chakra-ui/react'
import { cartSelector } from '../../stores/reducers/CartReducer'

const ProductDetailViewModel = () => {
  const dispatch = useDispatch()
  const toast = useToast()
  const { book } = useSelector(productSelector)
  const params = useParams()
  const [ productPrice, setProductPrice ] = useState()
  const [ productDefaultPrice, setProductDefaultPrice ] = useState()
  const [ productVariantId, setProductVariantId ] = useState()
  const [ quantity, setQuantity ] = useState(0)
  const [ loading, setLoading ] = useState(true)
  const [ variantSelected, setVariantSelected ] = useState()
  const [ visible, setVisible ] = useState(false)
  const { get } = useLocalStorage()
  const { isSuccess } = useSelector(cartSelector) 

  const accessTokenSaved = get({
    key: "accessToken"
  })

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setProductPrice(book.productVariants[0]?.productSalePrice)
      setProductDefaultPrice(book.productVariants[0]?.productDefaultPrice)
    }, 500)
  }, [book])

  useEffect(() => {
    setTimeout(() => {
      dispatch(getProductByIdAsyncThunk({
        id: params.id
      }))
      setLoading(false)
    }, 3000)
  }, [dispatch, params.id])

  const increase = () => {
    setQuantity(prev => prev + 1)
  }

  const decrease = () => {
    setQuantity(prev => prev - 1)
  }

  const handleSelectVariant = ({
    salePrice,
    defaultPrice
  }) => {
    setProductPrice(salePrice)
    setProductDefaultPrice(defaultPrice)
  }

  const getVariantId = (id) => {
    setProductVariantId(id)
  }

  useEffect(() => {
    if (quantity < 1)
    {
      setQuantity(0)
    }
  }, [quantity])

  const addProductToCart = ({ productVariantId, quantity }) => {
    if (quantity === 0)
    {
      alert("quantity much > 0")
    }
    dispatch(addProductToCartAsyncThunk({
      token: accessTokenSaved,
      productVariantId,
      quantity
    }))
  }

  const handleVariantSelected = (variant) => {
    setVariantSelected(variant)
  }

  useEffect(() => {
    if (isSuccess === true)
    {
      setVisible(true)
    }
    return () => {
      setTimeout(() => {
        setVisible(false)
      }, 2000)
    }
  }, [isSuccess])

  return {
    accessTokenSaved,
    book,
    productPrice,
    productDefaultPrice,
    quantity,
    loading,
    productVariantId,
    accessTokenSaved,
    variantSelected,
    visible,
    increase,
    decrease,
    handleSelectVariant,
    addProductToCart,
    getVariantId,
    handleVariantSelected
  }
}

export default ProductDetailViewModel