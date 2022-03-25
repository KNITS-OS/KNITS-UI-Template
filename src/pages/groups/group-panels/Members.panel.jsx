import { useState } from "react";

import { Button, ButtonGroup, Col, Row } from "reactstrap";

import { AddMemberPanel, CurrentMemberPanel } from ".";

export const MembersPanel = ({ group, setGroup }) => {
  const [currentMembersCollapse, setCurrentMembersCollapse] = useState(false);
  const [addMemberCollapse, setAddMemberCollapse] = useState(false);

  const [currentGroupMembers, setCurrentGroupMembers] = useState([]);

  const toggleCurrentMembers = () => {
    setCurrentMembersCollapse(!currentMembersCollapse);
    setAddMemberCollapse(false);
  };

  const toggleAddMember = () => {
    setAddMemberCollapse(!addMemberCollapse);
    setCurrentMembersCollapse(false);
  };

  return (
    <>
      <ButtonGroup className="d-flex">
        <Button onClick={toggleAddMember} color="success">
          Add new Member
        </Button>
        <Button
          onClick={toggleCurrentMembers}
          disabled={currentGroupMembers.length === 0}
          color="info"
        >
          {currentMembersCollapse ? "Hide members" : "Show members"} ({currentGroupMembers.length}{" "}
          members)
        </Button>
      </ButtonGroup>

      <Row>
        <Col lg="12">
          <AddMemberPanel
            addMemberCollapse={addMemberCollapse}
            group={group}
            setGroup={setGroup}
            currentGroupMembers={currentGroupMembers}
            setCurrentGroupMembers={setCurrentGroupMembers}
          />
        </Col>
      </Row>

      <Row>
        <Col lg="12">
          <CurrentMemberPanel
            group={group}
            currentMembersCollapse={currentMembersCollapse}
            currentGroupMembers={currentGroupMembers}
            setGroup={setGroup}
            setCurrentGroupMembers={setCurrentGroupMembers}
          />
        </Col>
      </Row>
    </>
  );
};
