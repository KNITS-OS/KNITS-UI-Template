import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Card, CardHeader, Container, Row } from "reactstrap";

import { BoxHeader } from "components/headers";

import { EMPLOYEE_DETAILS, employeesTableColumns } from "pages/users";

import { businessUnitsData, employeesData } from "data";

import { ReactTable } from "../../../components/widgets";
import {
  selectAllBusinessUnitsDataAsSelectOptions,
  selectAllCountriesDataAsSelectOptions,
  toDate,
} from "../../utils";
import { SearchEmployeesFilterPanel } from "../search-employees";

export const ExampleSearchPage = () => {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState(employeesData);

  const businessUnits = selectAllBusinessUnitsDataAsSelectOptions();
  const countries = selectAllCountriesDataAsSelectOptions();

  const onSearchEmployees = filters => {
    let filteredList = [...employeesData];

    if (filters.lastName) {
      filteredList = filteredList.filter(employee => {
        return employee.lastName.includes(filters.lastName);
      });
    }
    if (filters.businessUnitId) {
      const unit = businessUnitsData.find(unit => unit.id === filters.businessUnitId);
      filteredList = filteredList.filter(employee => {
        if (!unit) return [...employeesData];
        return employee.businessUnit === unit.name;
      });
    }
    if (filters.hiringDateFrom) {
      filteredList = filteredList.filter(employee => {
        return toDate(employee.startDate) >= toDate(filters.hiringDateFrom);
      });
    }
    if (filters.countryIso3) {
      filteredList = filteredList.filter(employee => {
        return employee.office.countryiso3 === filters.countryIso3;
      });
    }
    if (filters.newMembersOnly) {
      console.log(filters.newMembersOnly);
    }
    setEmployees(filteredList);
  };

  const onViewEmployeeDetails = e => {
    e.preventDefault();
    const { id } = e.currentTarget;
    navigate(`/admin${EMPLOYEE_DETAILS}/${id}`);
  };

  const onDeleteEmployee = e => {
    e.preventDefault();
    const { id } = e.currentTarget;
    setEmployees(employees.filter(employee => employee.id !== Number(id)));
  };

  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Row>
          <div className="col">
            <SearchEmployeesFilterPanel
              onSearchEmployees={onSearchEmployees}
              setEmployees={() => setEmployees(employeesData)}
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
