import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';


import {useContext} from 'react'
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: secondDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((duplicate) => duplicate._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const {data} = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
        window.alert('sorry. Product is out of stock');
        return;
    }

    secondDispatch({ type: 'CART_ADD_ITEM', payload: { ...item, quantity }, });
  }

//   const [onLoad, setOnLoad] = useState(12);
//   const loadMore = () => {
//     setOnLoad(onLoad + 4);
//   };

  return (
    <div>
      <Card>
        <Link to={`/product/${product.prod}`}>
          <img src={product.image} className="card-img-top" alt={product.name} />
        </Link>
        <Card.Body style={{ display: 'flex', flexDirection: 'column' }} className="product-info">
          <Link to={`/product/${product.prod}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <p>{product.description}</p>
          <Card.Text>
            <Rating rating={product.rating} numReviews={product.numReviews} />
            <strong>${product.price}</strong>
            {product.countInStock === 0 ? (

             <Button className='bg-warning text-light text-center' disabled>
                Out of Stock
             </Button>
            ) : (
                <Button onClick={() => addToCartHandler(product)} className="add-product-page-btn">Add to Cart</Button>
            )}
          </Card.Text>
          
        </Card.Body>
      </Card>

      

      {/* <Button className="btn btn-dark d-block w-100 see-more-product mt-3" onClick={() => loadMore()}>Add to Cart</Button> */}
    </div>

    
  );
}

export default Product;

/* <Container fluid className="mt-4">
        <h1 className="text-center">The Latest</h1>
        <Row className="row-cols-1 row-cols-md-2 g-4">
          <Col className="col-6">
            <Card>
               <Card.Img src= className="card-img" alt="..." /> 
              <Card.ImgOverlay>
                <Card.Title>Image 1</Card.Title>
                <Card.Text>Description of image 1.</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>

           <Col className="col-6">
            <Card>
               <Card.Img src= className="card-img" alt="..." />
              <Card.ImgOverlay>
                <Card.Title>Image 5</Card.Title>
                <Card.Text>Description of image 5.</Card.Text>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
      </Container> */