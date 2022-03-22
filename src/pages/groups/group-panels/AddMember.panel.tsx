import { useState } from "react";

import { Card, Collapse } from "reactstrap";

import { AddNewMemberButton } from "components/buttons";
import { ReactTable } from "components/widgets";

import { SearchAdvancedEmployeesFilterPanel, employeesTableColumns } from "pages/users";

import { employeesData } from "data";
import { useLocalStateAlerts } from "hooks";
import { Group, Employee, AdvancedEmployeeQueryFilters } from "types";

interface Props {
  group: Group;
  setGroup: (group: Group) => void;
  addMemberCollapse: boolean;
  currentGroupMembers: Employee[];
  setCurrentGroupMembers: React.Dispatch<React.SetStateAction<Employee[]>>;
}

export const AddMemberPanel = ({
  group,
  setGroup,
  addMemberCollapse,
  currentGroupMembers,
  setCurrentGroupMembers,
}: Props) => {
  const { alert, setSaveSent, setSuccessMessage, setIsSuccess } = useLocalStateAlerts();

  const [filters, setFilters] = useState<AdvancedEmployeeQueryFilters>({
    members: currentGroupMembers.map(member => member.id),
  });

  console.log("add member panel filters: ", filters);

  const [employeesResultSet] = useState(employeesData);
  return (
    <>
      {alert}
      <Collapse isOpen={addMemberCollapse}>
        <Card>
          <SearchAdvancedEmployeesFilterPanel
            setFilters={setFilters}
            currentGroupMembers={currentGroupMembers}
          />

          <ReactTable
            data={employeesResultSet}
            selectElement={
              <AddNewMemberButton
                setGroup={setGroup}
                setCurrentGroupMembers={setCurrentGroupMembers}
                setSaveSent={setSaveSent}
                setSuccessMessage={setSuccessMessage}
                setIsSuccess={setIsSuccess}
                setFilters={setFilters}
                group={group}
              />
            }
            columns={employeesTableColumns({})}
          />
        </Card>
      </Collapse>
    </>
  );
};
