import axios from "axios";
import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, Container, Row } from "reactstrap";

import { BoxHeader } from "components/headers";
import { ReactTable } from "components/widgets";

import { WORK_DETAILS } from "pages/work-orders/index";

import { employeesTableColumns } from "./index";

export const SearchEmployeesPage = () => {
  const navigate = useNavigate();
  const [works, setWorks] = useState([]);

  const onViewEmployeeDetails = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    navigate(`/admin${WORK_DETAILS}/${id}`);
  };

  const onDeleteEmployee = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    console.log("delete employee", id);
  };

  useEffect(() => {
    axios
      .get("https://my.api.mockaroo.com/work-orders.json", {
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": "b160b0a0",
        },
      })
      .then(resp => setWorks(resp.data));
  }, []);

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Work orders</h3>
              </CardHeader>

              <ReactTable
                data={works}
                columns={employeesTableColumns({
                  onDetailsButtonClick: onViewEmployeeDetails,
                  onRemoveButtonClick: onDeleteEmployee,
                })}
              />
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
