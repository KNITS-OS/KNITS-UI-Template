import { Button } from "reactstrap";

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
}) => {
  const onCareMemberAdd = () => {
    const careMemberIds = selectedFlatRows.map(careMember => careMember.id);

    setGroup({ ...group, members: [...group.members, ...careMemberIds] });
    setCurrentGroupMembers(previousCareMembers => [...previousCareMembers, ...selectedFlatRows]);
    setFilters(oldFilters => {
      const oldGroupMembers = oldFilters.members || [];

      return { ...oldFilters, members: [...oldGroupMembers, ...careMemberIds] };
    });

    setSuccessMessage("Member(s) added successfully");
    setIsSuccess(true);
    setSaveSent(true);

    if (toggleAllRowsSelected) {
      toggleAllRowsSelected();
    }
  };

  return (
    <Button color="success" onClick={onCareMemberAdd}>
      Add Members To Group
    </Button>
  );
};
