import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, Container, Row } from "reactstrap";

import { BoxHeader } from "components/headers";
import { ReactTable } from "components/widgets";

import { EMPLOYEE_DETAILS } from "pages/users";

import { businessUnitsData, countriesData, employeesData } from "data";
import { useLocalStateAlerts } from "hooks";

import { employeesTableColumns, SearchEmployeesFilterPanel, SearchEmployeesModal } from ".";

export const SearchEmployeesPage = () => {
  const navigate = useNavigate();

  const [employees] = useState(employeesData);

  const businessUnits = businessUnitsData;
  const countries = countriesData;
  const onSearchEmployees = filters => {
    console.log("filters", filters);
  };
  const { alert, setIsSuccess, setSuccessMessage, setSaveSent } = useLocalStateAlerts();
  const onViewEmployeeDetails = e => {
    e.preventDefault();
    const { id } = e.currentTarget;
    navigate(`/admin${EMPLOYEE_DETAILS}/${id}`);
  };

  const onDeleteEmployee = e => {
    e.preventDefault();
    const { id } = e.currentTarget;
    console.log("delete employee", id);
  };

  return (
    <>
      {alert}
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <SearchEmployeesFilterPanel
              onSearchEmployees={onSearchEmployees}
              // jobTitle={jobTitles}
              countries={countries}
              businessUnits={businessUnits}
            />
          </div>
        </Row>

        <Row>
          <div className="col">
            <Card>
              <CardHeader>
                <h3 className="mb-0">Employees</h3>
                <p className="text-sm mb-0">Kn Employees from PDM</p>
              </CardHeader>

              <ReactTable
                data={employees}
                selectElement={
                  <SearchEmployeesModal
                    setIsSuccess={setIsSuccess}
                    setSuccessMessage={setSuccessMessage}
                    setSaveSent={setSaveSent}
                  />
                }
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
