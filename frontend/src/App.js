import { Container, Navbar, Nav } from 'react-bootstrap';
import data from './data';

function App() {
  return (
    <div>
      <Container className="d-flex justify-content-center align-items-center first-nav">
        <nav>Free delivery over $100 anywhere in the US/30 days return free</nav>
      </Container>
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand>Avaloze</Navbar.Brand>

            <Nav>
              <a href="/cart" className="nav-link">
                Cart
              </a>
              <a href="/Signin" className="nav-link">
                Sign in
              </a>
            </Nav>
          </Container>
        </Navbar>
      </header>
      <main>
        <h1>Our Products</h1>
        <div className="products">
          {data.products.map((product) => (
            <div className="product" key={product.prod}>
              <a href={`/product/${product.prod}`}>
                <img src={product.image} alt={product.name} />
              </a>
              <div className="product-info">
                <a href={`/product/${product.prod}`}>
                  <p>{product.name}</p>
                </a>
                <p>{product.description}</p>
                <p>
                  <strong>${product.price}</strong>
                </p>
                <button>Add to cart</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
