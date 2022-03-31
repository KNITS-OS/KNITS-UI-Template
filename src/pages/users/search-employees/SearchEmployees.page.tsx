import { observer } from "mobx-react-lite";
import { getSnapshot } from "mobx-state-tree";
import { MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, Container, Row } from "reactstrap";

import { useStores } from "mobx/app";

import { BoxHeader } from "components/headers";
import { ReactTable } from "components/widgets";

import { EMPLOYEE_DETAILS } from "pages/users";

import { EmployeeQueryFilters } from "types";

import {
  selectAllBusinessUnitsDataAsSelectOptions,
  selectAllCountriesDataAsSelectOptions,
} from "../../utils";

import { employeesTableColumns, SearchEmployeesFilterPanel } from ".";

export const SearchEmployeesPage = observer(() => {
  const navigate = useNavigate();
  const { employeeStore } = useStores();

  console.dir(getSnapshot(employeeStore));

  const businessUnits = selectAllBusinessUnitsDataAsSelectOptions();
  const countries = selectAllCountriesDataAsSelectOptions();

  const onSearchEmployees = (filters: EmployeeQueryFilters) => {
    employeeStore.searchMemberlessEmployees(filters);
  };

  const onViewEmployeeDetails = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    navigate(`/admin${EMPLOYEE_DETAILS}/${id}`);
  };

  const onDeleteEmployee = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;

    employeeStore.deleteEmployee(parseInt(id));
  };

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <SearchEmployeesFilterPanel
              onSearchEmployees={onSearchEmployees}
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
                data={employeeStore.entities}
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
});
