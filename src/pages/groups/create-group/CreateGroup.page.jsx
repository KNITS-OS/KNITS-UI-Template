import { useState } from "react";
import { useDispatch } from "react-redux";

import { Container } from "reactstrap";

import { createGroup } from "redux/features";

import { BoxHeader } from "components/headers";

import { useLocalStateAlerts } from "hooks";
import { CREATE_ENTITY_ID } from "variables/app.consts";

import { EditGroupPanel } from "..";

export const CreateGroupPage = () => {
  const dispatch = useDispatch();
  const initialState = {
    id: CREATE_ENTITY_ID,
    name: "",
    description: "",
    members: [],
    active: true,
  };

  const [group, setGroup] = useState(initialState);
  const { alert, setSaveSent, setSuccessMessage, setIsSuccess } = useLocalStateAlerts();

  const onCreateGroup = () => {
    // eslint-disable-next-line no-unused-vars
    const { id, ...newGroup } = group;
    dispatch(createGroup(newGroup));

    setSuccessMessage("Group Created");
    setSaveSent(true);
    setIsSuccess(true);
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
