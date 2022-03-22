import { useEffect, useState } from "react";

import { Card, Collapse } from "reactstrap";

import { AddNewMemberButton } from "components/buttons";
import { ReactTable } from "components/widgets";

import { SearchAdvancedEmployeesFilterPanel, employeesTableColumns } from "pages/users";

import { employeeService } from "api";
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

  const [filters, setFilters] = useState<AdvancedEmployeeQueryFilters>({});

  const [employees, setEmployees] = useState<Employee[]>([]);

  const onSearchEmployees = async (filters: AdvancedEmployeeQueryFilters) => {
    const queryParams = new URLSearchParams(filters as any);
    const { data } = await employeeService.searchEmployees(queryParams);
    setEmployees(data);
  };

  useEffect(() => {
    onSearchEmployees({
      ...filters,
      members: currentGroupMembers.map(member => `id_ne=${member.id}`).join("&"),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentGroupMembers, filters]);

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
            data={employees}
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
