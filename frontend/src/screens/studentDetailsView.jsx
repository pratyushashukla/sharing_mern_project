import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Image, ListGroup, Card, Button, Form, Container } from "react-bootstrap";
import Loading from "../components/loader";
import Message from "../components/message";
import { getStudentDetails, updateStudent, deleteStudent } from "../actions/studentActions";
import { STUDENT_UPDATE_RESET } from "../constants/studentConstant";
import '../css//StudentDetailsView.css'; // Import custom CSS

const StudentDetailsView = ({ match, history }) => {
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();

  const studentDetails = useSelector((state) => state.studentDetails);
  const { loading, error, student } = studentDetails;
  const studentUpdate = useSelector((state) => state.studentUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = studentUpdate;
  const studentDelete = useSelector((state) => state.studentDelete);
  const { loading: loadingDelete, error: errorDelete, success: successDelete } = studentDelete;

  useEffect(() => {
    if (successDelete) {
      history.push("/");
    }
    if (successUpdate) {
      dispatch({ type: STUDENT_UPDATE_RESET });
    }
    if (!student || !student._id || student._id !== match.params.id) {
      dispatch(getStudentDetails(match.params.id));
    }
    if (student && student._id && !status) {
      setStatus(student.status);
    }
  }, [dispatch, match, successUpdate, successDelete, student, status, history]);

  const navigateToEdit = () => {
    history.push({
      pathname: `/student/edit/${student._id}`,
      state: { studentProps: student },
    });
  };

  const updateStatus = () => {
    student.status = status;
    dispatch(updateStudent(student));
  };

  const deleteStudent = () => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteStudent(student._id));
    }
  };

  return (
    <Container>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading || loadingUpdate || loadingDelete ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {student && (
            <Row>
              <Col md={3}>
                <Image src={student.image} alt={student.name} fluid />
              </Col>
              <Col md={4}>
                <Card className="mb-3">
                  <Card.Header as="h3">{student.name}</Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Phone No: </strong>{student.contact}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Father Contact: </strong>{student.fatherContact}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>City: </strong>{student.city}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Address: </strong>{student.address}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={5}>
                <Card className="mb-3">
                  <Card.Header as="h4">Room & Status</Card.Header>
                  <Card.Body>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Room No:</Col>
                          <Col>{student.roomNo}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Block No:</Col>
                          <Col>{student.blockNo}</Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                            <Form.Control as="select" value={status} onChange={(e) => setStatus(e.target.value)}>
                              {["Present", "Absent"].map((x) => (
                                <option key={x} value={x}>{x}</option>
                              ))}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <Button className="btn-block" type="button" onClick={updateStatus}>
                          Update
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <Button variant="primary" className="mr-2" onClick={navigateToEdit}>
                <i className="fas fa-edit"></i> Edit
              </Button>
              <Button variant="danger" onClick={deleteStudent}>
                <i className="fas fa-trash"></i> Delete
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default StudentDetailsView;
