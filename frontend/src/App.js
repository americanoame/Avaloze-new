import { Container, Navbar, Nav, Badge, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import ProductScreen from './pages/ProductScreen';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './pages/CartScreen';
import SigningScreen from './pages/SigningScreen';

import useProducts from './data/useProducts';
// import { useDispatch } from 'react-redux';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  // const [query, setQuery] = useState('');
  // const dispatch = useDispatch();

  const {loading,
    
    error,
    filter,
    filteredProducts,
    dispatch,} = useProducts() 
    console.log(filteredProducts)
  return (
    <BrowserRouter>
      <div className="d-flex flex-column how-to-put-the-footer-down ">
        <Container className="d-flex justify-content-center align-items-center first-nav">
          <nav>Free delivery over $100 anywhere in the US/ 7 days return free</nav>
        </Container>

        
        <header>
        

          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Avaloze</Navbar.Brand>
              </LinkContainer>

              <div>

              <Routes>
                <Route path='/' element={<Row className="d-flex justify-content-start align-items-center">
                  <Col sm={5} className="input-form">
                    <InputGroup>
                      <FormControl
                        type="text"
                        placeholder="Search Product"
                        aria-label="Search Product"
                        aria-describedby="basic-addon2"

                        value={filter} onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })}
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <Button
                      className="d-flex justify-content-center align-items-center clear-btn"
                      
                      value={filter} onClick={() => dispatch({ type: 'CLEAR_FILTER' })}
                    >
                      Clear filters
                    </Button>
                  </Col>
                </Row>}/>
              </Routes>
              </div>

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
          <Container>
            <Routes>
              <Route path="/product/:prod" element={<ProductScreen />} />

              <Route path="/cart" element={<CartScreen />} />
              <Route path="/" element={<HomeScreen filteredProducts={filteredProducts} loading={loading} error={error} />} />
              <Route path="/signing" element={<SigningScreen />} />
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
