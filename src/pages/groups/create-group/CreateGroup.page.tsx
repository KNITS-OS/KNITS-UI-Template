import { observer } from "mobx-react-lite";
import { useState } from "react";

import { Container } from "reactstrap";

import { useStores } from "mobx/app";

import { BoxHeader } from "components/headers";

import { useLocalStateAlerts } from "hooks";
import { Group, GroupSaveRequest } from "types";
import { initialGroupState } from "variables/app.consts";

import { EditGroupPanel } from "..";

export const CreateGroupPage = observer(() => {
  const { groupStore } = useStores();

  const [group, setGroup] = useState<Group>(initialGroupState);
  const { alert, setSaveSent, setSuccessMessage, setIsSuccess } = useLocalStateAlerts();

  const onCreateGroup = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...newGroup } = group;
    groupStore.createGroup(newGroup as GroupSaveRequest);

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
});
