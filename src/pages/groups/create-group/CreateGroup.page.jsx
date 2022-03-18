import { useState } from "react";
import { useDispatch } from "react-redux";

import { Container } from "reactstrap";

import { createGroup } from "redux/features";

import { BoxHeader } from "components/headers";

import { useLocalStateAlerts } from "hooks";

import { EditGroupPanel } from "..";

export const CreateGroupPage = () => {
  const dispatch = useDispatch();

  const initialState = {
    name: "",
    description: "",
    members: [],
    active: true,
  };

  const [group, setGroup] = useState(initialState);
  const { alert, setSaveSent, setSuccessMessage, setIsSuccess } = useLocalStateAlerts();

  const onCreateGroup = () => {
    dispatch(createGroup(group));

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
