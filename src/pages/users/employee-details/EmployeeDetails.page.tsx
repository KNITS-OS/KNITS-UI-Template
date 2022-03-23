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
import { useNavigate, useParams } from "react-router-dom";

import { Button, Card, CardBody, CardHeader, Col, Container, Row, Spinner } from "reactstrap";

import { BoxHeader } from "components/headers";

import { EmployeePanel, EMPLOYEE_SEARCH } from "pages/users";
import { selectAllGroupsDataAsSelectOptions } from "pages/utils";

import { employeeService } from "api";
import { useLocalStateAlerts } from "hooks";
import { Employee } from "types";

export const EmployeeDetailsPage = () => {
  const { id } = useParams() as { id: string };
  const employeeId = parseInt(id);
  const navigate = useNavigate();

  const { alert, setSaveSent, setSuccessMessage, setIsSuccess } = useLocalStateAlerts();

  const [employee, setEmployee] = useState<Employee>();

  const [groupOptions] = useState(selectAllGroupsDataAsSelectOptions());

  useEffect(() => {
    const fetchEmployee = async () => {
      const { data } = await employeeService.getEmployeeById(employeeId);
      setEmployee(data);
    };
    fetchEmployee();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!employee) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  const onSaveEmployee = async (updatedEmployee: Employee) => {
    const { data } = await employeeService.updateEmployee({
      id: employeeId,
      body: updatedEmployee,
    });
    setEmployee(data);

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
