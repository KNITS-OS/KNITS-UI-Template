import { ImCross } from "react-icons/im";
import { MdCheck } from "react-icons/md";

import { Card, CardBody, Col, Row } from "reactstrap";

export const EmployeeCard = ({ employee }) => {
  const { internationalName, office, title, careMember } = employee;
  return (
    <Col md="6">
      <Card>
        <CardBody className="ml-1 mr-3">
          <Row>
            <Col md="10">
              <h4 className="text-uppercase text-muted">{internationalName}</h4>
            </Col>
            <Col md="2">
              <p className="text-md">
                <span>
                  {careMember ? <MdCheck color="#08c792" /> : <ImCross color="#ed2939" />}
                </span>
              </p>
            </Col>
          </Row>
          <Row className="mt-3 ml-0 justify-content-between">
            <p className="text-sm mb-0">
              <span>{office.country}</span>
            </p>
            <p className="text-md mb-0">
              <span>{title}</span>
            </p>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};
