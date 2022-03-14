import { useState } from "react";

import { Card, Collapse, Spinner } from "reactstrap";

import { useAppSelector } from "redux/app";
import { selectCareMembersByFilters, selectLoggedUserDefaultCountry } from "redux/features";

import { AddNewMemberButton } from "components/buttons";
import { ReactTable } from "components/widgets";

import { careMemberTableColumns, SearchCareMemberFilterPanel } from "pages/users";

import { useLocalStateAlerts } from "hooks";

export const AddMemberPanel = ({
  group,
  setGroup,
  addMemberCollapse,
  currentGroupMembers,
  setCurrentGroupMembers,
}) => {
  const { alert, setSaveSent, setSuccessMessage, setIsSuccess } = useLocalStateAlerts();

  const userCountry = useAppSelector(selectLoggedUserDefaultCountry);

  const [filters, setFilters] =
    useState <
    CareMemberQueryFilters >
    {
      countryIso3: userCountry,
      members: currentGroupMembers.map(member => member.id),
    };

  const careMemberResultSet: CareMember[] = useAppSelector(selectCareMembersByFilters(filters));

  return (
    <>
      {alert}
      <Collapse isOpen={addMemberCollapse}>
        <Card>
          <SearchCareMemberFilterPanel
            filters={filters}
            setFilters={setFilters}
            currentGroupMembers={currentGroupMembers}
          />
          {/* @todo add loading here */}
          {!careMemberResultSet ? (
            <div className="text-center">
              <Spinner />
            </div>
          ) : (
            <ReactTable
              data={careMemberResultSet}
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
              columns={careMemberTableColumns({})}
            />
          )}
        </Card>
      </Collapse>
    </>
  );
};
