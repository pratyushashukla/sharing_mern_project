import React, { useEffect, useState } from "react";
import { Table, Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { postAttendance } from "../actions/attendanceActions";
import { Link } from "react-router-dom";
import './AttendanceTableComponent.css'; // Import custom CSS

const AttendanceTableComponent = ({ students, attendanceMap, attendance, roomNo }) => {
  const dispatch = useDispatch();

  const [localAttendanceMap, setLocalAttendanceMap] = useState({});

  useEffect(() => {
    setLocalAttendanceMap(attendanceMap);
  },[attendanceMap]);

  const updateAttendance = (event) => {
    event.preventDefault();

    if (attendance) {
      if (!attendance.roomNo.includes(roomNo)) {
        attendance.roomNo.push(roomNo);
      }
    }
    const roomData = attendance ? attendance.roomNo : roomNo;
    const dataData = localAttendanceMap;
    const detailsData = attendance ? attendance.details : {};

    students.map((student) => {
      detailsData[student._id] = {
        name: student.name,
        contact: student.contact,
        roomNo: student.roomNo,
      };
    });

    dispatch(
      postAttendance({
        roomNo: roomData,
        details: detailsData,
        data: dataData,
      })
    );
  };

  console.log("attendance2",attendance)

  console.log("attendanceMap",attendanceMap)

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Attendance for Room {roomNo}</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover responsive className="table-sm">
            <thead className="thead-dark">
              <tr>
                <th>NAME</th>
                <th>ATTENDANCE</th>
                <th>CONTACT</th>
                <th>CITY</th>
              </tr>
            </thead>
            <tbody>
              {students &&
                students.map((student) => (
                  <tr key={student._id}>
                    <td>
                      <Link to={`/student/${student._id}`}>{student.name}</Link>
                    </td>
                    <td>
                      <Form>
                        <Form.Group controlId={`status-${student._id}`}>
                          <Form.Control
                          class
                            as="select"
                            size="sm"
                            value={localAttendanceMap[student._id] || attendance.data[student._id]}
                            onChange={(e) => {
                              var tempMap = { ...localAttendanceMap };
                              tempMap[student._id] = e.target.value;
                              setLocalAttendanceMap(tempMap);
                            }}
                          >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                          </Form.Control>
                        </Form.Group>
                      </Form>
                    </td>
                    <td>
                      <a href={`tel:${student.contact}`}>{student.contact}</a>
                    </td>
                    <td>{student.city}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col className="text-center">
          <Button variant="success" onClick={(event) => updateAttendance(event)}>
            Update Attendance
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AttendanceTableComponent;
