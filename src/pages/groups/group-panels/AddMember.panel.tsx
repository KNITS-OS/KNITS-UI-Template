import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";

import { Card, Collapse } from "reactstrap";

import { useStores } from "mobx/app";

import { AddNewMemberButton } from "components/buttons";
import { ReactTable } from "components/widgets";

import { SearchAdvancedEmployeesFilterPanel, employeesTableColumns } from "pages/users";

import { useLocalStateAlerts } from "hooks";
import { Group, Employee, AdvancedEmployeeQueryFilters } from "types";

interface Props {
  group: Group;
  addMemberCollapse: boolean;
  currentGroupMembers: Employee[];
  setCurrentGroupMembers: React.Dispatch<React.SetStateAction<Employee[]>>;
}

export const AddMemberPanel = observer(
  ({ group, addMemberCollapse, currentGroupMembers, setCurrentGroupMembers }: Props) => {
    const { employeeStore } = useStores();
    const { alert, setSaveSent, setSuccessMessage, setIsSuccess } = useLocalStateAlerts();

    const [filters, setFilters] = useState<AdvancedEmployeeQueryFilters>({});

    const onSearchEmployees = (filters: AdvancedEmployeeQueryFilters) => {
      employeeStore.searchEmployees(filters);
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
              data={employeeStore.entities}
              selectElement={
                <AddNewMemberButton
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
  }
);
