import { MouseEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, Collapse } from "reactstrap";

import { employeeService } from "redux/features";

import { ReactTable } from "components/widgets";

import { EMPLOYEE_DETAILS, employeesTableColumns } from "pages/users";

import { Employee, Group } from "types";

interface Props {
  group: Group;
  currentMembersCollapse: boolean;
  currentGroupMembers: Employee[];
  setGroup: React.Dispatch<React.SetStateAction<Group>>;
  setCurrentGroupMembers: React.Dispatch<React.SetStateAction<Employee[]>>;
}

export const CurrentMemberPanel = ({
  group,
  currentMembersCollapse,
  currentGroupMembers,
  setGroup,
  setCurrentGroupMembers,
}: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGroupMembers = async (members: number[]) => {
      const groupMembers = await employeeService.searchEmployeesByIds(members);
      setCurrentGroupMembers(groupMembers.data as Employee[]);
    };

    if (group.members.length > 0) {
      fetchGroupMembers(group.members);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onViewMemberDetails = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget as HTMLButtonElement;
    navigate(`/admin${EMPLOYEE_DETAILS}/${id}`);
  };

  const onRemoveMember = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget as HTMLButtonElement;
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
