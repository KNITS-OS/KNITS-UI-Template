import { observer } from "mobx-react-lite";

import { Button, Card, CardBody, CardHeader, Container, Row } from "reactstrap";

import { BoxHeader } from "components/headers";

import { useStores } from "mobx/app";

export const HomePage = observer(() => {
  const { counterStore } = useStores();
  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Home</h3>
              </CardHeader>
              <CardBody>
                <Button onClick={() => counterStore.increment()}>Increment</Button>
                <Button onClick={() => counterStore.decrement()}>Decrement</Button>
                <h2>Value {counterStore.value}</h2>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
});
