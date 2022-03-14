import { useNavigate, useParams } from "react-router-dom";

import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

import { useAppDispatch, useAppSelector } from "redux/app";
import {
  selectAllGroupsDataAsSelectOptions,
  selectAllRolesDataAsSelectOptions,
  selectEmployeeById,
  createCareMember,
  updateEmployee,
  selectCareMemberState,
} from "redux/features";

import { BoxHeader } from "components/headers";

import { EMPLOYEE_SEARCH, CareMemberPanel } from "pages/users";
import { autoOffboardingDate, createOnboardingDate } from "pages/utils";

import { useAlerts } from "hooks";

import { CREATE_ENTITY_ID } from "variables/app.consts";

export const CreateCareMemberPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const employeeIdAsInt = parseInt(id);

  const employee = useAppSelector(state => selectEmployeeById(state, employeeIdAsInt));
  const roles: SelectOption[] = useAppSelector(selectAllRolesDataAsSelectOptions);
  const groups: SelectOption[] = useAppSelector(selectAllGroupsDataAsSelectOptions);

  const careMemberState = useAppSelector(selectCareMemberState);
  const { alert, setSaveSent, setSuccessMessage } = useAlerts(careMemberState);

  const createDefaultCareMember = (): CareMember => {
    const { onboardingDate } = createOnboardingDate();

    const { defaultOffBoardingDate } = autoOffboardingDate();

    return {
      ...employee,
      careMember: true,
      id: CREATE_ENTITY_ID,
      employeeId: employeeIdAsInt,
      onboardingDate,
      offboardingDate: defaultOffBoardingDate,
      groups: [],
    };
  };

  const onCreateCareMember = (careMemberSaveRequest: CareMemberSaveRequest): void => {
    dispatch(createCareMember(careMemberSaveRequest));
    dispatch(updateEmployee({ id: employeeIdAsInt, body: { ...employee, careMember: true } }));
    setSuccessMessage("Care Member Created");
    setSaveSent(true);
  };

  const careMember: CareMember = createDefaultCareMember();

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
                    <h3 className="mb-0">New Care Member</h3>
                  </Col>
                </Row>
                <Row className="align-items-center py-4">
                  <Col lg="12" xs="7" className="text-right">
                    <Button
                      type="button"
                      color="info"
                      onClick={() => navigate(`/admin${EMPLOYEE_SEARCH}`)}
                    >
                      Back to Employees
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <CareMemberPanel
                  careMember={careMember}
                  groupOptions={groups}
                  roleOptions={roles}
                  onSave={onCreateCareMember}
                  buttonName={`Invite ${employee.firstName} ${employee.lastName}`}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
