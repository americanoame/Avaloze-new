import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import { useState } from 'react';

// import {useContext} from 'react'
// import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  //   const { dispatch: secondDispatch } = useContext(Store);
  //   const addToCartHandler = () => {
  //     secondDispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity: 1 }, });
  //   };

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
          </Card.Text>
          <Button className="add-product-page-btn">Add to Cart</Button>
        </Card.Body>
      </Card>

      {/* <Button className="btn btn-dark d-block w-100 see-more-product mt-3" onClick={() => loadMore()}>Add to Cart</Button> */}
    </div>

    
  );
}

export default Product;
