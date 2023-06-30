import { useEffect, useReducer } from 'react';
import { Col, Row, Container, Card } from 'react-bootstrap';
import axios from 'axios';


import logger from 'use-reducer-logger';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const img5 = '/images/main-banner.jpg'

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

function HomeScreen() {
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
    <div><p>i will code a mini carousel over here with photo and promotion</p></div>

      <h1>Our Products</h1>
      <div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.map((product) => (
              <Col key={product.prod} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <Container fluid className="mt-4">
        <h1 className="text-center">The Latest</h1>
        <Row className="row-cols-1 row-cols-md-2 g-4">
          <Col className="col-6">
            <Card>
               <Card.Img src={img5} className="card-img" alt="..." /> 
              <Card.ImgOverlay>
                <Card.Title>Image 1</Card.Title>
                <Card.Text>Description of image 1.</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>

           <Col className="col-6">
            <Card>
               <Card.Img src={img5} className="card-img" alt="..." />
              <Card.ImgOverlay>
                <Card.Title>Image 5</Card.Title>
                <Card.Text>Description of image 5.</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
      </Container> 
    </div>

   


  );
}

export default HomeScreen;
