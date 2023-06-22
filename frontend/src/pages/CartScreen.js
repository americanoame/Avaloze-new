import { useContext } from 'react';
import { Store } from '../Store';
import { Row, Col, ListGroup, Button, Card } from 'react-bootstrap';
import MessageBox from '../components/MessageBox';
import { Link } from 'react-router-dom';
import  axios  from 'axios';

// import img5 from "../image/main-banner.jpg";

export default function CartScreen() {
  const { state, dispatch: secondDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    const {data} = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
        window.alert('sorry. Product is out of stock');
        return;
    }

    secondDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity }, });
  }

  const removeItemHandler = (item) => {
    secondDispatch({ type: 'CART_REMOVE_ITEM', payload: item });
  }

//   const [ product] = useReducer(reducer, {
//     product: [],
    
//   });

  return (
    <Row>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <MessageBox>
            <span role="img" aria-label="shocked">
              😱
            </span>
            You haven't added anything to your cart yet!
            <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row className="align-items-center">
                  <Col md={4}>
                    <img src={item.image} alt={item.name} className="img-fluid rounded img-thumbnail"></img>
                    {''}
                    <Link to={`/product/${item.prod}`}>{item.name}</Link>
                  </Col>
                  <Col md={3}>
                    <Button 
                    onClick={() => 
                    updateCartHandler(item, item.quantity - 1)
                    } 

                    className="add-product-page-btn w-30 fs-5" disabled={item.quantity === 1}>
                      <i className="fas fa-minus-circle"></i>
                    </Button>
                    {''}
                    <span>{item.quantity}</span>
                    {''}

                    <Button 
                    onClick={() => 
                    updateCartHandler(item, item.quantity + 1)

                    } 
                    className="add-product-page-btn w-30 fs-5"  aria-disabled={item.quantity === item.countInStock}>
                      <i className="fas fa-plus-circle"></i>
                    </Button>
                  </Col>
                  <Col md={3}>${item.price}</Col>
                  <Col md={2}>
                    <Button onClick={() => removeItemHandler(item)} 
                    variant="light">
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                  {''}
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}
                  {''}
                  item) : ${cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </h3>
              </ListGroup.Item>
              <div className='d-grid'>
                <Button
                type='button'
                className="add-product-page-btn"
                disabled={cartItems.length === 0}
                >
                    Proceed to Checkout
                </Button>
              </div>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>


      
    </Row>
  );
}
