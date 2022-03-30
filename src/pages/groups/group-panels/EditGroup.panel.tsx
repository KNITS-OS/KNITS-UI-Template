import { observer } from "mobx-react-lite";

import { Button, Card, CardBody, CardHeader, Col, Row } from "reactstrap";

import { useStores } from "mobx/app";

import { InputField } from "components/widgets";

import { Group } from "types";

import { MembersPanel } from ".";

interface Props {
  group: Group;
  onSave: (group: Group) => void;
  isLoading?: boolean;
  onBackToSearchClick?: () => void;
}

export const EditGroupPanel = observer(({ group, onSave, onBackToSearchClick }: Props) => {
  const { groupStore } = useStores();
  const { name, description } = group;

  return (
    <Row>
      <Col className="order-xl-1" xl="12">
        <Card>
          <CardHeader>
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Group Details</h3>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <>
              <h6 className="heading-small text-muted mb-4">Group information</h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="10">
                    <InputField
                      id="input-group-name"
                      label="Group Name"
                      value={name}
                      type="text"
                      onChange={e =>
                        groupStore.updateGroupState({
                          name: "name",
                          value: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>

                <Row>
                  <Col lg="10">
                    <InputField
                      id="input-group-description"
                      label="Group Description"
                      value={description}
                      type="text"
                      onChange={e =>
                        groupStore.updateGroupState({
                          name: "description",
                          value: e.target.value,
                        })
                      }
                    />
                  </Col>
                </Row>
              </div>

              <MembersPanel group={group} />

              <Row className="align-items-center py-4">
                <Col lg="12" xs="7" className="text-right">
                  <Button color="success" onClick={() => onSave(group)}>
                    Submit
                  </Button>

                  {onBackToSearchClick ? (
                    <Button color="info" onClick={onBackToSearchClick}>
                      Back to Search
                    </Button>
                  ) : (
                    <> &nbsp;</>
                  )}
                </Col>
              </Row>
            </>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
});
