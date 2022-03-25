import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, Collapse } from "reactstrap";

import { employeeService } from "redux/features";

import { ReactTable } from "components/widgets";

import { employeesTableColumns, EMPLOYEE_DETAILS } from "pages/users";

export const CurrentMemberPanel = ({
  group,
  currentMembersCollapse,
  currentGroupMembers,
  setGroup,
  setCurrentGroupMembers,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupMembers = async members => {
      const groupMembers = await employeeService.searchEmployeesByIds(members);
      setCurrentGroupMembers(groupMembers.data);
    };

    if (group.members.length > 0) {
      fetchGroupMembers(group.members);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
