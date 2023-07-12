
import { Col, Row, Container, Card, Button } from 'react-bootstrap';


import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

const img5 = '/images/main-banner.jpg';



function HomeScreen({filteredProducts, loading, error}) {
  
  

  
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

      

      <Button className="btn btn-dark d-block w-100 add-to-cart-btn mt-3">Show More Products</Button>
    </div>
  );
}

export default HomeScreen;
