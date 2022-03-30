import { observer } from "mobx-react-lite";

import { Container } from "reactstrap";

import { useStores } from "mobx/app";

import { BoxHeader } from "components/headers";

import { useLocalStateAlerts } from "hooks";
import { GroupSaveRequest } from "types";

import { EditGroupPanel } from "..";

export const CreateGroupPage = observer(() => {
  const { groupStore } = useStores();

  const { alert, setSaveSent, setSuccessMessage, setIsSuccess } = useLocalStateAlerts();

  const onCreateGroup = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...newGroup } = groupStore.entity;
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
        <EditGroupPanel group={groupStore.entity} onSave={onCreateGroup} />
      </Container>
    </>
  );
});
