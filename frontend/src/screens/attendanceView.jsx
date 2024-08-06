import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getStudentsByRoomNo as action } from "../actions/studentActions";
import AttendanceTable from "../components/attendanceTable";

const AttendanceView = () => {
  const [roomNo, setRoomNo] = useState("");
  const [showTable, setShowTable] = useState(false);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(action(roomNo));
    setShowTable(true);
  };

  const changeRoomNo = (e) => {
    setRoomNo(e.target.value);
    setShowTable(false); // Hide the table when room number changes
  };

  return (
    <>
      <h2>Take Attendance</h2>
      <Form onSubmit={submitHandler} inline>
        <Form.Control className="mr-sm-2 ml-sm-5" as="Select" value={roomNo} onChange={(e) => changeRoomNo(e)}>
          <option value="" disabled selected>
            Select Room No.
          </option>
          {["01", "02", "03", "04", "05"].map((x) => (
            <option key={x} value={x}>
              {x}
            </option>
          ))}
        </Form.Control>
        <Button type="submit">Get Students</Button>
      </Form>

      {showTable && roomNo && <AttendanceTable roomNo={roomNo} />}
    </>
  );
};

export default AttendanceView;
