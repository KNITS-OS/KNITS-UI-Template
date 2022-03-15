import { useState } from "react";

import { Card, Collapse, Spinner } from "reactstrap";

import { AddNewMemberButton } from "components/buttons";
import { ReactTable } from "components/widgets";

import { SearchAdvancedEmployeesFilterPanel, employeesTableColumns } from "pages/users";

import { useAuth } from "context";
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

  const { user } = useAuth();
  const [filters, setFilters] = useState({
    countryIso3: user.countryCode3,
    members: currentGroupMembers.map(member => member.id),
  });

  const employeesResultSet = employeesData;

  return (
    <>
      {alert}
      <Collapse isOpen={addMemberCollapse}>
        <Card>
          <SearchAdvancedEmployeesFilterPanel
            filters={filters}
            setFilters={setFilters}
            currentGroupMembers={currentGroupMembers}
          />
          {/* @todo add loading here */}
          {!employeesResultSet ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
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
          )}
        </Card>
      </Collapse>
    </>
  );
};
