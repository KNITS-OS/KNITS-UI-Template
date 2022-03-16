import { useState } from "react";

import { Card, Collapse } from "reactstrap";

import { AddNewMemberButton } from "components/buttons";
import { ReactTable } from "components/widgets";

import { SearchAdvancedEmployeesFilterPanel, employeesTableColumns } from "pages/users";

import { employeesData } from "data";
import { useLocalStateAlerts } from "hooks";

export const AddMemberPanel = ({
  group,
  setGroup,
  addMemberCollapse,
  currentGroupMembers,
  setCurrentGroupMembers,
}) => {
  const { alert, setSaveSent, setSuccessMessage, setIsSuccess } = useLocalStateAlerts();

  const [filters, setFilters] = useState({
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
