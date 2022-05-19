import { useState } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

import { BoxHeader } from "components/headers";

export const AssetsPage = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <Col className="order-xl-1" xl="12">
            <Card>
              <CardHeader>
                <Dropdown isOpen={activeMenu} toggle={() => setActiveMenu(!activeMenu)}>
                  <DropdownToggle caret color="primary" className="shadow-none text-white border-0">
                    Tabs menu
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem
                      className={`font-weight-bold ${activeTab === "1" ? "bg-lighter" : ""}`}
                      onClick={() => setActiveTab("1")}
                    >
                      Tab 1
                    </DropdownItem>
                    <DropdownItem
                      className={`font-weight-bold ${activeTab === "2" ? "bg-lighter" : ""}`}
                      onClick={() => setActiveTab("2")}
                    >
                      Tab 2
                    </DropdownItem>
                    {/*<DropdownItem divider />*/}
                    <DropdownItem
                      className={`font-weight-bold ${activeTab === "3" ? "bg-lighter" : ""}`}
                      onClick={() => setActiveTab("3")}
                    >
                      Tab 3
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
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
