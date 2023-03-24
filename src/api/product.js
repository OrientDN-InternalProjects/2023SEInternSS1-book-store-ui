import axios from 'axios'

const fetchProductAsync = async (url) => {
  try {
    const response = await axios.get(`${url}/api/product`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const getProductById = async (url, id) => {
  try {
    const response = await axios.get(`${url}/api/product/${id}`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const fetchMostProductBestSellerAsync = async (url) => {
  try {
    const response = await axios.get(`${url}/api/product/product-most-seller`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

const fetchTopNewProductsAsync = async (url) => {
  try {
    const response = await axios.get(`${url}/api/product/product-top-new`)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
export { fetchProductAsync, getProductById, fetchMostProductBestSellerAsync, fetchTopNewProductsAsync }