import { Card, CardBody, CardHeader, Container, Row } from "reactstrap";

import { BoxHeader } from "components/headers";

export const InventoryPage = () => {
  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Inventory page</h3>
              </CardHeader>
              <CardBody />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
