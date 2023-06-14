import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Product(props) {
  const { product } = props;
  return (
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
          <strong>${product.price}</strong>
        </Card.Text>
        <Button className="add-product-page-btn">Add to cart</Button> 
      </Card.Body>
    </Card>
  );
}

export default Product;
