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
      const allMembers = group.members;
      allMembers.push(...memberIds);
      const memberFilter = allMembers.map(memberId => `id_ne=${memberId}`).join("&");
      return { ...oldFilters, ...memberFilter };
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
