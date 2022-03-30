import { observer } from "mobx-react-lite";
import { Dispatch, SetStateAction } from "react";

import { Button } from "reactstrap";

import { useStores } from "mobx/app";

import { AdvancedEmployeeQueryFilters, Employee, Group } from "types";

interface Props {
  selectedFlatRows?: Employee[];
  toggleAllRowsSelected?: (value?: boolean | undefined) => void;
  setCurrentGroupMembers: Dispatch<SetStateAction<Employee[]>>;
  setSaveSent: Dispatch<SetStateAction<boolean>>;
  setSuccessMessage: Dispatch<SetStateAction<string>>;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  setFilters: Dispatch<SetStateAction<AdvancedEmployeeQueryFilters>>;
  group: Group;
}

export const AddNewMemberButton = observer(
  ({
    selectedFlatRows = [],
    toggleAllRowsSelected,
    setCurrentGroupMembers,
    setSaveSent,
    setSuccessMessage,
    setIsSuccess,
    setFilters,
    group,
  }: Props) => {
    const { groupStore } = useStores();

    const onMemberAdd = () => {
      const memberIds = selectedFlatRows.map(member => member.id);

      groupStore.updateGroupState({
        name: "members",
        value: [...group.members, ...memberIds],
      });
      setCurrentGroupMembers(previousMembers => [...previousMembers, ...selectedFlatRows]);
      setFilters(oldFilters => {
        return {
          ...oldFilters,
          members: (oldFilters.members, memberIds.map(id => `id_ne=${id}`).join("&")),
        };
      });

      setSuccessMessage("Member(s) added successfully");
      setSaveSent(true);
      setIsSuccess(true);

      if (toggleAllRowsSelected) {
        toggleAllRowsSelected();
      }
    };

    return (
      <Button color="success" onClick={onMemberAdd}>
        Add Members To Group
      </Button>
    );
  }
);
