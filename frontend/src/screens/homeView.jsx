import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Student from "../components/student";
import Loading from "../components/loader.jsx";
import Message from "../components/message.jsx";
import { listStudents } from "../actions/studentActions";
import Paginate from "../components/paginate";
import { Row, Col, Container, ButtonGroup, ToggleButton } from "react-bootstrap";
import StudentsTableView from "./studentTableView";
import "../css//HomeView.css";

const HomeView = ({ match, history }) => {
  const [isGrid, setIsGrid] = useState(true);
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading: userLoading, userInfo } = userLogin;
  const dispatch = useDispatch();
  const studentsList = useSelector((state) => state.studentsList);
  const { loading, error, students, page, pages } = studentsList;

  useEffect(() => {
    if (!userLoading && !userInfo) {
      history.push("/login");
    }
    dispatch(listStudents(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber, history, userInfo, userLoading]);

  return (
    <Container className="home-container">
      {/* <Row className="justify-content-md-center my-3">
        <Col md="auto">
          <ButtonGroup toggle>
            {["Grid", "Table"].map((type) => (
              <ToggleButton
                key={type}
                type="radio"
                variant="secondary"
                name="radio"
                value={type}
                checked={(isGrid ? "Grid" : "Table") === type}
                onChange={(e) => setIsGrid(e.target.value === "Grid")}
              >
                {type}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
      </Row> */}
      <h1>Students</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : isGrid ? (
        <>
          <Row>
            {students.map((student) => (
              <Col key={student._id} sm={12} md={6} lg={4} xl={3} className="mb-3">
                <div className="student-card">
                  <Student student={student} />
                </div>
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""} />
        </>
      ) : (
        <StudentsTableView keyword={keyword} pageNumber={pageNumber} />
      )}
    </Container>
  );
};

export default HomeView;
