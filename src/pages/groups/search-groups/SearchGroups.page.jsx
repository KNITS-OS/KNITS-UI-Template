import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, Container, Row } from "reactstrap";

import { BoxHeader } from "components/headers";
import { ReactTable } from "components/widgets";

import { groupsData } from "data";

import { GROUP_DETAILS } from "..";

import { groupsTableColumns } from ".";

export const SearchGroupsPage = () => {
  const navigate = useNavigate();

  const [groups] = useState(groupsData);

  const onViewGroupDetails = e => {
    const { id } = e.target;
    navigate(`/admin${GROUP_DETAILS}/${id}`);
  };

  const onDeleteGroup = e => {
    const { id } = e.target;
    console.log("delete group", id);
  };

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Groups</h3>
                <p className="text-sm mb-0">Groups</p>
              </CardHeader>

              <ReactTable
                data={groups}
                columns={groupsTableColumns({
                  onDetailsButtonClick: onViewGroupDetails,
                  onRemoveButtonClick: onDeleteGroup,
                })}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
