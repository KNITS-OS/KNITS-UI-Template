import { useState } from "react";

import { Container } from "reactstrap";

import { BoxHeader } from "components/headers";

import { CREATE_ENTITY_ID } from "variables/app.consts";

import { EditGroupPanel } from "..";

export const CreateGroupPage = () => {
  const initialState = {
    id: CREATE_ENTITY_ID,
    name: "",
    description: "",
    members: [],
    active: true,
  };

  const [group, setGroup] = useState(initialState);

  const onCreateGroup = () => {
    console.log("create group", group);
  };
  return (
    <>
      {alert}
      <BoxHeader />

      <Container className="mt--6" fluid>
        <EditGroupPanel group={group} setGroup={setGroup} onSave={onCreateGroup} />
      </Container>
    </>
  );
};
