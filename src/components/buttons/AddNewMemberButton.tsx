import { Dispatch, SetStateAction } from "react";

import { Button } from "reactstrap";

import { AdvancedEmployeeQueryFilters, Employee, Group } from "types";

interface Props {
  selectedFlatRows?: Employee[];
  toggleAllRowsSelected?: (value?: boolean | undefined) => void;
  setGroup: (group: Group) => void;
  setCurrentGroupMembers: Dispatch<SetStateAction<Employee[]>>;
  setSaveSent: Dispatch<SetStateAction<boolean>>;
  setSuccessMessage: Dispatch<SetStateAction<string>>;
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
  setFilters: Dispatch<SetStateAction<AdvancedEmployeeQueryFilters>>;
  group: Group;
}

export const AddNewMemberButton = ({
  selectedFlatRows = [],
  toggleAllRowsSelected,
  setCurrentGroupMembers,
  setGroup,
  setSaveSent,
  setSuccessMessage,
  setIsSuccess,
  setFilters,
  group,
}: Props) => {
  const onMemberAdd = () => {
    const memberIds = selectedFlatRows.map(member => member.id);

    setGroup({ ...group, members: [...group.members, ...memberIds] });
    setCurrentGroupMembers(previousMembers => [...previousMembers, ...selectedFlatRows]);
    setFilters(oldFilters => {
      const oldGroupMembers = oldFilters.members || [];

      return { ...oldFilters, members: [...oldGroupMembers, ...memberIds] };
    });

    setSuccessMessage("Member(s) added successfully");
    setIsSuccess(true);
    setSaveSent(true);

    if (toggleAllRowsSelected) {
      toggleAllRowsSelected();
    }
  };

  return (
    <Button color="success" onClick={onMemberAdd}>
      Add Members To Group
    </Button>
  );
};
