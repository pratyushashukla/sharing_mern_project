import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./loader";
import Message from "./message";
import AttendanceTableComponent from "./attendanceTableComponent";

const AttendanceTable = ({ roomNo }) => {

  const [attendanceMap, setAttendanceMap] = useState({});

  const getStudentsByRoomNo = useSelector((state) => state.getStudentsByRoomNo);

  const { loading, error, students, attendance } = getStudentsByRoomNo;
  const attendanceDataEnter = useSelector((state) => state.attendanceDataEnter);
  const { loading: loadingAttendance, error: errorAttendance } = attendanceDataEnter;

  useEffect(() => {
    if (students) {
      arrangeTable();
    }
  }, [attendance, students]); // Remove unnecessary dependencies

const arrangeTable = () => {
  let tempMap = {};
  if (attendance) {
    students.forEach((student) => {
      if (attendance.data[student._id]) {
        tempMap[String(student._id)] = attendance.data[student._id];
      } else {
        tempMap[String(student._id)] = "Present";
      }
    });
  } else {
    students.forEach((student) => {
      tempMap[String(student._id)] = "Present";
    });
  }
  setAttendanceMap(tempMap);
};
  return (
    <>
      {error && <Message variant="danger">{error}</Message>}
      {loading || loadingAttendance ? (
        <Loading />
      ) : (
        <>
          {errorAttendance && <Message variant="danger">{errorAttendance}</Message>}
          {Object.keys(attendanceMap).length > 0 && (
            <AttendanceTableComponent
              students={students}
              attendanceMap={attendanceMap}
              attendance={attendance}
              roomNo={roomNo}
            />
          )}
        </>
      )}
    </>
  );
};

export default AttendanceTable;
