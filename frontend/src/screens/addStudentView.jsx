import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Container, Card } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addStudent, updateStudent } from "../actions/studentActions";
import Loading from "../components/loader.jsx";
import Message from "../components/message.jsx";
import { STUDENT_UPDATE_RESET } from "../constants/studentConstant";
import Loader from "../components/loader";
import { clearAddStudentData } from "../reducers/studentsReducer.jsx";

const AddStudentView = () => {
  const history = useHistory();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [contact, setContact] = useState("");
  const [fatherContact, setFatherContact] = useState("");
  const [image, setImage] = useState("");
  const [roomNo, setRoomNo] = useState("01");
  const [blockNo, setBlockNo] = useState("");
  const [status, setStatus] = useState("Absent");

  const dispatch = useDispatch();
  const studentAdd = useSelector((state) => state.studentAdd);
  const { loading, error, success } = studentAdd;
  const studentUpdate = useSelector((state) => state.studentUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = studentUpdate;

  useEffect(() => {
    dispatch(clearAddStudentData());
    setName("");
    setAddress("");
    setCategory("");
    setCity("");
    setContact("");
    setFatherContact("");
    setImage("");
    setRoomNo("");
    setBlockNo("");
    setStatus("");
  }, []);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: STUDENT_UPDATE_RESET });
      history.push("/");
    }
    if (history.location.state && history.location.state.studentProps) {
      setIsEdit(true);
      const student = history.location.state.studentProps;
      setName(student.name);
      setAddress(student.address);
      setCategory(student.category);
      setCity(student.city);
      setContact(student.contact);
      setFatherContact(student.fatherContact);
      setImage(student.image);
      setRoomNo(student.roomNo);
      setBlockNo(student.blockNo);
      setStatus(student.status);
    }
    if (success) {
      history.push("/");
    }
  }, [dispatch, history, success, successUpdate]);

  const submitHandler = () => {
    if (isEdit) {
      const _id = history.location.state.studentProps._id;
      dispatch(
        updateStudent({
          _id,
          name,
          address,
          category,
          city,
          contact,
          fatherContact,
          image,
          roomNo,
          blockNo,
          status,
        })
      );
    } else {
      dispatch(
        addStudent({
          name,
          address,
          category,
          city,
          contact,
          fatherContact,
          image,
          roomNo,
          blockNo,
          status,
        })
      );
    }
  };

  return (
    <Container>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {loading || loadingUpdate ? (
        <Loader />
      ) : (
        <>
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          <Card className="p-4 shadow-sm">
            <h1>{isEdit ? "Edit Student" : "Add Student"}</h1>
            {loading && <Loading />}
            {error && <Message variant="danger">{error}</Message>}
            <Form onSubmit={submitHandler}>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="name" className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="status" className="mb-3">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                      {["Present", "Absent"].map((x) => (
                        <option key={x} value={x}>
                          {x}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="address" className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="city" className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter city" value={city} onChange={(e) => setCity(e.target.value)} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="contact" className="mb-3">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter phone number"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="fatherContact" className="mb-3">
                    <Form.Label>Father Contact</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter father phone number"
                      value={fatherContact}
                      onChange={(e) => setFatherContact(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="roomNo" className="mb-3">
                    <Form.Label>Room No</Form.Label>
                    <Form.Control
                  as="select"
                  value={roomNo}
                  onChange={(e) => setRoomNo(e.target.value)}
                >
                  <option value="" disabled selected>Select Room No.</option>
                  {["01", "02", "03", "04", "05"].map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="blockNo" className="mb-3">
                    <Form.Label>Block Number</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter block number"
                      value={blockNo}
                      onChange={(e) => setBlockNo(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="image" className="mb-3">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter image URL"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="category" className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter stream"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" variant="primary" className="w-100 mt-3">
                {isEdit ? "Update" : "Add Student"}
              </Button>
            </Form>
          </Card>
        </>
      )}
    </Container>
  );
};

export default AddStudentView;
