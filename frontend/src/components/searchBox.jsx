import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import './SearchBox.css'; // Import custom CSS

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push(`/`);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="search-box-form">
      <InputGroup>
        <Form.Control
          type='text'
          value={keyword}
          name='q'
          placeholder='Search students...'
          onChange={(e) => setKeyword(e.target.value)}
          className="search-box-input"
        />
        <Button type='submit' variant='primary' className="search-box-button">
          <i className="fas fa-search"></i>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBox;
