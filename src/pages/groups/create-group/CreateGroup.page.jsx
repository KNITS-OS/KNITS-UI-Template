import { useState } from "react";

import { Container } from "reactstrap";

import { useAppSelector } from "redux/app";
import { selectGroupState } from "redux/features";

import { BoxHeader } from "components/headers";

import { useAlerts } from "hooks";
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

  const groupsState = useAppSelector(selectGroupState);

  const { alert, setSaveSent, setSuccessMessage } = useAlerts(groupsState);

  const [group, setGroup] = useState(initialState);

  const onCreateGroup = () => {
    console.log("create group", group);
    setSuccessMessage("Group Created");
    setSaveSent(true);
  };
  return (
    <>
      {alert}
      <BoxHeader />

      <Container className="mt--6" fluid>
        <EditGroupPanel
          group={group}
          setGroup={setGroup}
          onSave={onCreateGroup}
          isLoading={groupsState.isLoading}
        />
      </Container>
    </>
  );
};
