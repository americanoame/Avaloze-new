import { Container, Navbar, Nav } from 'react-bootstrap';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsItem from './pages/ProductsItem';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

function App() {
  return (
    <BrowserRouter>
      <div className='d-flex flex-column how-to-put-the-footer-down'>
        <Container className="d-flex justify-content-center align-items-center first-nav">
          <nav>Free delivery over $100 anywhere in the US/30 days return free</nav>
        </Container>
        <header>
          <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>Avaloze</Navbar.Brand>
              </LinkContainer>

              <Nav>
                <Link to="/cart" className="nav-link">
                  Cart
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
            <Route path="/" element={<ProductsItem />} />
          </Routes>
          </Container>
        </main>
        <footer>
          <div className='text-center'>all right reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
