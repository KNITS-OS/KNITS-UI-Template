import { observer } from "mobx-react-lite";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, Collapse } from "reactstrap";

import { useStores } from "mobx/app";

import { ReactTable } from "components/widgets";

import { EMPLOYEE_DETAILS, employeesTableColumns } from "pages/users";

import { Employee } from "types";

interface Props {
  currentMembersCollapse: boolean;
  currentGroupMembers: Employee[];
  setCurrentGroupMembers: React.Dispatch<React.SetStateAction<Employee[]>>;
}

export const CurrentMemberPanel = observer(
  ({ currentMembersCollapse, currentGroupMembers, setCurrentGroupMembers }: Props) => {
    const navigate = useNavigate();
    const { groupStore } = useStores();
    const onViewMemberDetails = (e: MouseEvent<HTMLButtonElement>) => {
      const { id } = e.currentTarget as HTMLButtonElement;
      navigate(`/admin${EMPLOYEE_DETAILS}/${id}`);
    };

    const onRemoveMember = (e: MouseEvent<HTMLButtonElement>) => {
      const { id } = e.currentTarget as HTMLButtonElement;
      const newGroupMembers = currentGroupMembers.filter(member => member.id !== parseInt(id));
      setCurrentGroupMembers(prevState => prevState.filter(member => member.id !== parseInt(id)));

      groupStore.updateGroupState({
        name: "members",
        value: newGroupMembers.map(member => member.id),
      });
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
  }
);
