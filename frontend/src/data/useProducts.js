import { useEffect, useReducer, useMemo } from 'react';
import axios from 'axios';




function productReducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, products: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      case 'SET_FILTER':
        return { ...state, filter: action.payload };
  
      case 'CLEAR_FILTER':
        return { ...state, filter: '' };
  
      default:
        throw new Error("This action doesn't exist");
    }
  }
  
  function useProducts() {
    const [{ loading, products, error, filter }, dispatch] = useReducer(
      productReducer, 
      {
      loading: true,
      error: null,
      products: null,
      filter: '',
    });
  
    useEffect(() => {
      const fetchData = async () => {
        dispatch({ type: 'FETCH_REQUEST' });
        try {
          const result = await axios.get('/api/products');
          console.log(result.data)
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        } catch (err) {
          dispatch({ type: 'FETCH_FAIL', payload: err.message });
        }
      };
      fetchData();
    }, []);
  
  
    const filteredProducts = useMemo(() => {
      return products?.filter((product) => {
        if (!filter) {
          return true;
        }
        return product.name.toLowerCase().includes(filter.toLowerCase());
      }) || [];
    }, [filter, products]);
  
    return {
      loading,
      products,
      error,
      filter,
      filteredProducts,
      dispatch,
    };
  }

  export default useProducts;