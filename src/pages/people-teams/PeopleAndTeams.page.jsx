import { useState } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import { BoxHeader } from "components/headers";

export const PeopleAndTeamsPage = () => {
  const [activeTab, setActiveTab] = useState("1");

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card>
              <CardHeader>
                <Nav pills>
                  <NavItem>
                    <NavLink
                      href="#"
                      className={`font-weight-bold ${activeTab === "1" ? "active" : ""}`}
                      onClick={() => setActiveTab("1")}
                    >
                      Tab 1
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="#"
                      className={`font-weight-bold ${activeTab === "2" ? "active" : ""}`}
                      onClick={() => setActiveTab("2")}
                    >
                      Tab 2
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      href="#"
                      className={`font-weight-bold ${activeTab === "3" ? "active" : ""}`}
                      onClick={() => setActiveTab("3")}
                    >
                      Tab 3
                    </NavLink>
                  </NavItem>
                </Nav>
              </CardHeader>
              <CardBody>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">Content 1</TabPane>
                  <TabPane tabId="2">Content 2</TabPane>
                  <TabPane tabId="3">Content 3</TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
