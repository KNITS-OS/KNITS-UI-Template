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
  const onMemberAdd = () => {
    const memberIds = selectedFlatRows.map(member => member.id);

    setGroup({ ...group, members: [...group.members, ...memberIds] });
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
};
