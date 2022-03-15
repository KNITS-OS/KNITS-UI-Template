import { useNavigate } from "react-router-dom";

import { Card, CardHeader, Collapse } from "reactstrap";

import { ReactTable } from "components/widgets";

import { EMPLOYEE_DETAILS, employeesTableColumns } from "pages/users";

export const CurrentMemberPanel = ({
  currentMembersCollapse,
  currentGroupMembers,
  setGroup,
  setCurrentGroupMembers,
}) => {
  const navigate = useNavigate();

  const onViewMemberDetails = e => {
    const { id } = e.currentTarget;
    navigate(`/admin${EMPLOYEE_DETAILS}/${id}`);
  };

  const onRemoveMember = e => {
    const { id } = e.currentTarget;
    const newGroupMembers = currentGroupMembers.filter(member => member.id !== parseInt(id));
    setCurrentGroupMembers(prevState => prevState.filter(member => member.id !== parseInt(id)));
    setGroup(prevState => ({
      ...prevState,
      members: newGroupMembers.map(member => member.id),
    }));
  };

  return (
    <Collapse isOpen={currentMembersCollapse}>
      <Card>
        <CardHeader>
          <h3 className="mb-0">Group members</h3>
          <p className="text-sm mb-0">Care Members</p>
        </CardHeader>

        <ReactTable
          data={currentGroupMembers}
          columns={employeesTableColumns({
            onDetailsButtonClick: onViewMemberDetails,
            onRemoveButtonClick: onRemoveMember,
          })}
        />
      </Card>
    </Collapse>
  );
};
