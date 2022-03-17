/*!

=========================================================
* Argon Dashboard PRO React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Card, CardBody, CardHeader, Col, Container, Row, Spinner } from "reactstrap";

import {
  selectAllGroupsDataAsSelectOptions,
  searchEmployee,
  updateEmployee,
  selectEmployeesState,
} from "redux/features";

import { BoxHeader } from "components/headers";

import { EmployeePanel, EMPLOYEE_SEARCH } from "pages/users";

import { useLocalStateAlerts } from "hooks";

export const EmployeeDetailsPage = () => {
  const { id } = useParams();
  const employeeId = parseInt(id);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { alert, setSaveSent, setSuccessMessage, setIsSuccess } = useLocalStateAlerts();

  const employeeState = useSelector(selectEmployeesState);
  const [employee] = useState(employeeState.entity);

  const groupOptions = useSelector(selectAllGroupsDataAsSelectOptions);

  useEffect(() => {
    dispatch(searchEmployee(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("employee 1234", employee);

  if (employeeState.isLoading || !employee) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  const onSaveEmployee = async employeeRequest => {
    const body = {
      ...employee,
      ...employeeRequest,
    };
    dispatch(updateEmployee(employeeId, body));
    setSuccessMessage("Employee Updated");
    setSaveSent(true);
    setIsSuccess(true);
  };

  return (
    <>
      {alert}
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card>
              <CardHeader>
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Employee Details</h3>
                  </Col>
                </Row>
                <Row className="align-items-center py-4">
                  <Col lg="12" xs="7" className="text-right">
                    <Button
                      className="btn btn-primary"
                      color="primary"
                      onClick={() => navigate(`/admin${EMPLOYEE_SEARCH}`)}
                    >
                      Back to Search
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <EmployeePanel
                  employee={employee}
                  groupOptions={groupOptions}
                  onSave={onSaveEmployee}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
