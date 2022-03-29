import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Card, CardBody, CardHeader, Col, Container, Row, Spinner } from "reactstrap";

import { useStores } from "mobx/app";

import { BoxHeader } from "components/headers";
import { InputField } from "components/widgets";

import { useLocalStateAlerts } from "hooks";

import { MembersPanel } from "..";
import { GROUP_SEARCH } from "../groups.routes.const";

export const GroupDetailsPage = observer(() => {
  const { id } = useParams() as { id: string };
  const groupId = parseInt(id);
  const navigate = useNavigate();

  const { groupStore } = useStores();

  const { entity: group } = groupStore;

  const { alert, setSaveSent, setSuccessMessage, setIsSuccess } = useLocalStateAlerts();

  if (!group) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  useEffect(() => {
    groupStore.findGroupById(groupId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupStore]);

  const onSaveGroup = () => {
    groupStore.updateGroup({ id: groupId, body: group });
    setSuccessMessage("Group Updated");
    setSaveSent(true);
    setIsSuccess(true);
  };

  const onToggleGroupActive = () => {
    groupStore.updateGroupState({
      name: "active",
      value: !group.active,
    });
  };
  const onDeleteGroup = () => {
    groupStore.deleteGroup(groupId);
    navigate(`/admin${GROUP_SEARCH}`);
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
                    <h3 className="mb-0">Group Details</h3>
                  </Col>
                </Row>
                <Row className="align-items-center py-4">
                  <Col lg="12" xs="7" className="text-right">
                    {group && group.active ? (
                      <Button type="button" color="danger" onClick={onToggleGroupActive}>
                        Deactivate Group
                      </Button>
                    ) : (
                      <Button type="button" color="success" onClick={onToggleGroupActive}>
                        Activate Group
                      </Button>
                    )}
                    <Button type="button" color="info" onClick={() => navigate(-1)}>
                      Back to Search
                    </Button>
                  </Col>
                </Row>
              </CardHeader>

              <CardBody>
                <>
                  <h6 className="heading-small text-muted mb-4">Group Details</h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="10">
                        <InputField
                          id="input-group-name"
                          label="Group Name"
                          value={group?.name}
                          type="text"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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
                          value={group?.description}
                          type="text"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
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

                  <hr className="my-4" />

                  <div className="pl-lg-4">
                    <Row>
                      <Button color="primary" onClick={onSaveGroup}>
                        Save
                      </Button>
                      <Button color="danger" onClick={onDeleteGroup}>
                        Delete group
                      </Button>
                    </Row>
                  </div>
                </>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
});
