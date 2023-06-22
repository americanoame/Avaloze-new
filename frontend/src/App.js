import { Container, Navbar, Nav, Badge } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import ProductScreen from './pages/ProductScreen';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './pages/CartScreen';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <BrowserRouter>
      <div className="d-flex flex-column how-to-put-the-footer-down">
        <Container className="d-flex justify-content-center align-items-center first-nav">
          <nav>Free delivery over $100 anywhere in the US/ 7 days return free</nav>
        </Container>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Avaloze</Navbar.Brand>
              </LinkContainer>

              {/* <section className="d-flex justify-content-center align-items-center">
                <div className="col-5 input-form mt-4">
                  <div className="input-group">
                    <input type="text" class="form-control" placeholder="Search Product" aria-label="Search Product" aria-describedby="basic-addon2" />
                  </div>
                </div>
                <button className="d-flex justify-content-center align-items-center clear-btn">Clear filters</button>
              </section> */}

              <Nav>
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                <Link to="/Signing" className="nav-link">
                  Sign in
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:prod" element={<ProductScreen />} />

              <Route path="/cart" element={<CartScreen />} />
              <Route path="/" element={<HomeScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
        <p id="copyright" className="text-center">
          Copyright © {new Date().getFullYear()} Avaloze.com
        </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
