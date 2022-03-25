import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Card, Collapse } from "reactstrap";

import { searchEmployees, selectAllEmployeeData } from "redux/features";

import { AddNewMemberButton } from "components/buttons";
import { ReactTable } from "components/widgets";

import { employeesTableColumns, SearchAdvancedEmployeesFilterPanel } from "pages/users";

import { useLocalStateAlerts } from "hooks";

export const AddMemberPanel = ({
  group,
  setGroup,
  addMemberCollapse,
  currentGroupMembers,
  setCurrentGroupMembers,
}) => {
  const dispatch = useDispatch();
  const { alert, setSaveSent, setSuccessMessage, setIsSuccess } = useLocalStateAlerts();

  const [filters, setFilters] = useState({});

  const employees = useSelector(selectAllEmployeeData);

  const onSearchEmployees = async filters => {
    dispatch(searchEmployees(filters));
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
