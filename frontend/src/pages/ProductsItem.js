import { useEffect, useReducer } from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import axios from 'axios';
// import data from '../data';
import { Link } from 'react-router-dom';
import logger from 'use-reducer-logger';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, lading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function ProductsItem() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  //   const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      //   setProducts(result.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <h1>Our Products</h1>
      <div className="products">
        {loading ? (
          <div>Loading...(your page will be right back)</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          products.map((product) => (
            <Col className="product" key={product.prod}>
              <Link to={`/product/${product.prod}`}>
                <img src={product.image} className="cad-img-top" alt={product.name} />
              </Link>
              <Card.Body style={{ display: 'flex', flexDirection: 'column' }} className="product-info">
                <Link to={`/product/${product.prod}`}>
                  <Card.Title>{product.name}</Card.Title>
                </Link>
                <p>{product.description}</p>
                <Card.Text>
                  <strong>${product.price}</strong>
                </Card.Text>
                <Button className="add-product-page-btn">Add to cart</Button> 
              </Card.Body>
            </Col>
          ))
        )}
      </div>
    </div>
  );
}

export default ProductsItem;
