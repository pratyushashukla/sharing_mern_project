import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Button, Modal, Form, Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import { deleteAttendanceByDate, getAnalysisByDate } from "../actions/attendanceActions";
import AnalysisComponent from "../components/analysisComponent";
import Loading from "../components/loader";
import Message from "../components/message";

const AnalysisView = () => {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [days, setDays] = useState(0);
  const [idList, setIdList] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const attendanceAnalysis = useSelector((state) => state.attendanceAnalysis);
  const { attendance } = attendanceAnalysis;
  const attendanceDelete = useSelector((state) => state.attendanceDelete);
  const { loading: loadingDelete, success: successDelete, error: errorDelete } = attendanceDelete;

  useEffect(() => {
    if (attendance) {
      const temp = [];
      Object.entries(attendance.details).forEach((at) => {
        temp.push(at[0]);
      });
      setIdList(temp);
    } else {
      dispatch(getAnalysisByDate(startDate.toString().substring(0, 15)));
    }
  }, [attendance, dispatch]);

  const changeDate = (date) => {
    dispatch(getAnalysisByDate(date.toString().substring(0, 15)));
    setStartDate(date);
  };

  const showModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const startDelete = () => {
    setModal(false);
    dispatch(deleteAttendanceByDate(days));
  };

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return (
    <Container>
      <Row className="justify-content-between align-items-center my-3">
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
        <Button variant="outline-danger" size="sm" onClick={showModal}>
          Delete Attendance
        </Button>
      </Row>
      {loadingDelete && <Loading />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {successDelete && <Message variant="success">Attendance Deleted</Message>}

      <Row className="my-3">
        <Col md={8}>
          <h5>Attendance Report For <strong>{startDate.toLocaleDateString("en-GB", options)}</strong></h5>
        </Col>
        <Col md={4}>
          <DatePicker selected={startDate} onChange={(date) => changeDate(date)} className="form-control" />
        </Col>
      </Row>

      <Modal show={modal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter Number of days before to delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="days">
              <Form.Label>Enter number of days</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter days"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
          <Button variant="outline-danger" onClick={startDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <AnalysisComponent />
    </Container>
  );
};

export default AnalysisView;
