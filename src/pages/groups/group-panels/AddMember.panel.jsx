import { useEffect, useState } from "react";

import { Card, Collapse } from "reactstrap";

import { AddNewMemberButton } from "components/buttons";
import { ReactTable } from "components/widgets";

import { SearchAdvancedEmployeesFilterPanel, employeesTableColumns } from "pages/users";

import { employeeService } from "api";
import { useLocalStateAlerts } from "hooks";

export const AddMemberPanel = ({
  group,
  setGroup,
  addMemberCollapse,
  currentGroupMembers,
  setCurrentGroupMembers,
}) => {
  const { alert, setSaveSent, setSuccessMessage, setIsSuccess } = useLocalStateAlerts();

  const [filters, setFilters] = useState({});

  const [employees, setEmployees] = useState([]);

  const onSearchEmployees = async filters => {
    const queryParams = new URLSearchParams(filters);
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
