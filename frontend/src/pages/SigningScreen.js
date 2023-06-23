import { Link, useLocation, } from "react-router-dom";
import {Form, Container, Button} from 'react-bootstrap';

export default function SigningScreen() {
    const {search} = useLocation();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';
    return (
        <Container className='small-container'>
           {/* <Helmet>
            <title>Sign In</title>
           </Helmet> */}
           <h1 className="my-3">Sing In</h1>
           <Form>
              <Form.Group className='mb-3' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' required />
              </Form.Group>

              <Form.Group className='mb-3' controlId='password'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='email' required />
              </Form.Group>
              <div className='mb-3'>
                <Button className="add-product-page-btn" type='submit'>Sign In</Button>
              </div>
              <div className='mb-3'>
                New Customer? {''}
             <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
              </div>
           </Form>
        </Container>
    )
}