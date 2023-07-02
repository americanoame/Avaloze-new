import { useEffect, useReducer, useState } from 'react';
import { Col, Row, Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';

// import { Link } from 'react-router-dom';

import logger from 'use-reducer-logger';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const img5 = '/images/main-banner.jpg';

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

    const [onLoad, setOnLoad] = useState(12);
    const loadMore = () => {
    setOnLoad(onLoad + 4);
  };

  return (
    <div>
      <div>
        <div className="container-xxl mb-2 background">
          <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div class="carousel-item active">
                <img src={img5} class="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item ">
                <img src={img5} class="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                <img src={img5} class="d-block w-100" alt="..." />
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

            {/* <div class="carousel-caption ">
              <p className="logo">AvaloZe</p>

              <h5 className="--text-marketing">"Our customer is not just king, but the entire kingdom. They are the reason for our existence and the source of our success."</h5>

              <div className="--text-marketing-two">
                <Link to="product" className="button">
                  GO TO PRODUCTS
                </Link>
              </div>
            </div> */}
          </div>
        </div>

        {/* <h4>Our Products</h4> */}
        <div>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <Row>
              {products.map((product) => (
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
          {products.map((product) => (
            <Col key={product.prod} sm={6} md={4} lg={3} className="mb-3">
              <Product product={product}></Product>
            </Col>
          ))}
        </Row>

      </div>

      <Button className="d-block w-100 load-more-product  mt-3 mb-1" onClick={() => loadMore()}>Load more Products</Button>
    </div>
  );
}

export default HomeScreen;
