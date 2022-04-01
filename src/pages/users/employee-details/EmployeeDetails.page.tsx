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

import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Card, CardBody, CardHeader, Col, Container, Row, Spinner } from "reactstrap";

import { useStores } from "mobx/app";

import { BoxHeader } from "components/headers";

import { EmployeePanel, EMPLOYEE_SEARCH } from "pages/users";
import { selectAllGroupsDataAsSelectOptions } from "pages/utils";

import { useLocalStateAlerts } from "hooks";
import { Employee, SelectOption } from "types";

export const EmployeeDetailsPage = observer(() => {
  const { id } = useParams() as { id: string };
  const employeeId = parseInt(id);
  const navigate = useNavigate();

  const { employeeStore } = useStores();

  const { alert, setSaveSent, setSuccessMessage, setIsSuccess } = useLocalStateAlerts();

  const [groupOptions, setGroupOptions] = useState<SelectOption[]>([]);

  useEffect(() => {
    employeeStore.findEmployeeById(employeeId);

    const getData = async () => {
      const groups = await selectAllGroupsDataAsSelectOptions();
      setGroupOptions(groups);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (employeeStore.isLoading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  const onSaveEmployee = async (updatedEmployee: Employee) => {
    employeeStore.updateEmployee({ id: employeeId, body: updatedEmployee });

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
                <EmployeePanel groupOptions={groupOptions} onSave={onSaveEmployee} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
});
