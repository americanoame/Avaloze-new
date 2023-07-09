import React, { useEffect, useReducer, useMemo } from 'react';
import { Col, Row, Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const img5 = '/images/main-banner.jpg';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'SET_FILTERS':
      return { ...state, filter: action.payload };

      case "CLEAR_FILTER":
      return { ...state, filter: "" };

    default:
      throw new Error("This action doesn't exist");
  
  }
};

function HomeScreen() {
  const [{ loading, error, products, filter }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
    filter: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
    };
    fetchData();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (!filter) {
        return true;
      }
      return product.name.toLowerCase().includes(filter.toLowerCase());
    });
  }, [filter, products]);

  

  return (

    

    <div>
      <div className="container-xxl mb-2 background">
        <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={img5} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item ">
              <img src={img5} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={img5} className="d-block w-100" alt="..." />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>

      <div>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product.prod} sm={6} md={3} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
          </Row>
        )}
      </div>

      <Container fluid className="mt-2">
        <h2 className="text-center">The Latest</h2>
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

      <Row className="mt-4">
        {filteredProducts.map((product) => (
          <Col key={product.prod} sm={6} md={4} lg={3} className="mb-3">
            <Product product={product}></Product>
          </Col>
        ))}
      </Row>

      <Button className="btn btn-dark d-block w-100 add-to-cart-btn mt-3">
        Show More Products
      </Button>
    </div>
  );
}

export default HomeScreen;
