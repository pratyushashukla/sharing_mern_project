import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/message';
import Loader from '../../components/loader';
import FormContainer from '../../components/formContainer';
import { login } from '../../actions/userActions';

const LoginView = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // Email and Password regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  return (
    <Card style={{ backgroundColor: '#F5F4F4', borderRadius: '10px', margin:'2em' }}>
      <Card.Body>
        <FormContainer>
          <h1>Sign In</h1>
          {error && <Message variant='danger'>{error}</Message>}
          {loading && <Loader />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                pattern={emailRegex}
              />
              <Form.Text className='text-muted'>
                Please enter a valid email address.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                pattern={passwordRegex}
                aria-describedby="passwordHelpBlock"
              />
              <Form.Text className='text-muted'>
                Password must be at least 8 characters long and contain at least one digit,
                one uppercase letter, and one lowercase letter.
              </Form.Text>
            </Form.Group>

            <Button type='submit' variant='primary' style={{borderRadius:'10px'}}>
              Sign In
            </Button>
          </Form>

          <Row className='py-3'>
            <Col>
              New Customer?{' '}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
              >
                Register
              </Link>
            </Col>
          </Row>
        </FormContainer>
      </Card.Body>
    </Card>
  );
};

export default LoginView;
