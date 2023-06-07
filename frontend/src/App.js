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
        <div>
          {data.products.map((product) => (
            <div key={product.prod}>
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>{product.price}</p>
              
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
