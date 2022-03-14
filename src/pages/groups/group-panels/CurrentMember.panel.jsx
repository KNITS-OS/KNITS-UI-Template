import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, Collapse, Spinner } from "reactstrap";

import { ReactTable } from "components/widgets";

import { careMemberTableColumns, CARE_MEMBER_EDIT } from "pages/users";

export const CurrentMemberPanel = ({
  currentMembersCollapse,
  currentGroupMembers,
  setGroup,
  setCurrentGroupMembers,
}) => {
  const navigate = useNavigate();

  const onViewEmailDetails = e => {
    const { id } = e.currentTarget;
    navigate(`/admin${CARE_MEMBER_EDIT}/${id}`);
  };

  const onRemoveMember = e => {
    const { id } = e.currentTarget;
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
        {/* @todo add loading here */}
        {!currentGroupMembers ? (
          <div
            style={{
              textAlign: "center",
            }}
          >
            <Spinner />
          </div>
        ) : (
          <ReactTable
            data={currentGroupMembers}
            columns={careMemberTableColumns({
              onDetailsButtonClick: onViewEmailDetails,
              onRemoveButtonClick: onRemoveMember,
            })}
          />
        )}
      </Card>
    </Collapse>
  );
};
