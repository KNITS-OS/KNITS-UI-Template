import { observer } from "mobx-react-lite";
import { MouseEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, Container, Row, Spinner } from "reactstrap";

import { useStores } from "mobx/app";

import { BoxHeader } from "components/headers";
import { ReactTable } from "components/widgets";

import { GROUP_DETAILS } from "..";

import { groupsTableColumns } from ".";

export const SearchGroupsPage = observer(() => {
  const navigate = useNavigate();
  const { groupStore } = useStores();

  useEffect(() => {
    groupStore.findGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onViewGroupDetails = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.target as HTMLElement;
    navigate(`/admin${GROUP_DETAILS}/${id}`);
  };

  const onDeleteGroup = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.target as HTMLElement;
    groupStore.deleteGroup(parseInt(id));
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
              {groupStore.isLoading ? (
                <div className="text-center mt-4 mb-4">
                  <Spinner />
                </div>
              ) : (
                <ReactTable
                  data={groupStore.entities}
                  columns={groupsTableColumns({
                    onDetailsButtonClick: onViewGroupDetails,
                    onRemoveButtonClick: onDeleteGroup,
                  })}
                />
              )}
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
});
