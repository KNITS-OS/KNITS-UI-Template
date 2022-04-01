import { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, Container, Row } from "reactstrap";

import { useAppSelector } from "redux/app";
import {
  deleteEmployee,
  searchEmployees,
  selectAllBusinessUnitsDataAsSelectOptions,
  selectAllCountriesDataAsSelectOptions,
  selectAllEmployeeData,
} from "redux/features";

import { BoxHeader } from "components/headers";
import { ReactTable } from "components/widgets";

import { EMPLOYEE_DETAILS } from "pages/users";

import { EmployeeQueryFilters } from "types";

import { employeesTableColumns, SearchEmployeesFilterPanel } from ".";

export const SearchEmployeesPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const employees = useAppSelector(state => selectAllEmployeeData(state.orm));

  const businessUnits = useAppSelector(selectAllBusinessUnitsDataAsSelectOptions);
  const countries = useAppSelector(selectAllCountriesDataAsSelectOptions);

  const onSearchEmployees = async (filters: EmployeeQueryFilters) => {
    dispatch(searchEmployees(filters));
  };

  const onViewEmployeeDetails = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;
    navigate(`/admin${EMPLOYEE_DETAILS}/${id}`);
  };

  const onDeleteEmployee = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget;

    dispatch(deleteEmployee(parseInt(id)));
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
                data={employees}
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
