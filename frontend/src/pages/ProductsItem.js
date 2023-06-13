import {useEffect, useState} from 'react';
import { Card, Col, Button } from 'react-bootstrap';
import axios from 'axios';
// import data from '../data';
import { Link } from 'react-router-dom';

function ProductsItem() {
    const [products, setProducts] = useState([]);
    useEffect(() => {
      const fetchData = async () => {
        const result = await axios.get('/api/products');
        setProducts(result.data);
      };
      fetchData();
    }, []);
  return (
    <div>
      <h1>Our Products</h1>
      <div className="products">
        {products.map((product) => (
          
            <Col className="product" key={product.prod}>
              <Link  to={`/product/${product.prod}`}>
                <img src={product.image} className="cad-img-top" alt={product.name} />
              </Link>
              <Card.Body style={{display: 'flex', flexDirection: 'column'}} className="product-info">
                <Link to={`/product/${product.prod}`}>
                  <Card.Title>{product.name}</Card.Title>
                </Link>

                <p>{product.description}</p>
                <Card.Text>
                  <strong>${product.price}</strong>
                </Card.Text>
                <Button className='add-product-page-btn'>Add to cart</Button> 
              </Card.Body>
            </Col>
          
        ))}
      </div>
    </div>
  );
}

export default ProductsItem;
