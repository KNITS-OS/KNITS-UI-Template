import { Moment } from "moment";
import { useState } from "react";

import { Col, Row } from "reactstrap";

import { WithAuthorization } from "components/authorization";
import { FilterPanel } from "components/panels";
import { DateField, InputField, SelectField } from "components/widgets";

import { selectLoggedUserDefaultCountryAsSelection } from "pages/utils";

import { useAuth } from "context";
import { EmployeeQueryFilters, Permission, Role, SelectOption } from "types";
import { DATE_FILTER_FORMAT } from "variables/app.consts";

interface onSearchEmployeesFunction {
  (employeeSearchRequest: EmployeeQueryFilters): void;
}

interface Props {
  countries: SelectOption[];
  businessUnits: SelectOption[];
  onSearchEmployees: onSearchEmployeesFunction;
}

export const SearchEmployeesFilterPanel = ({
  businessUnits,
  countries,
  onSearchEmployees,
}: Props) => {
  const { user } = useAuth();
  const [searchLastName, setSearchLastName] = useState("");

  const [businessUnitSelected, setBusinessUnitSelected] = useState<SelectOption | null>();
  const [countrySelected, setCountrySelected] = useState<SelectOption | null>(
    selectLoggedUserDefaultCountryAsSelection(user.countryCode3)
  );

  const [searchHiringDate, setSearchHiringDate] = useState<Moment | undefined>();

  const onChangeSearchLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchLastName = e.target.value;
    setSearchLastName(searchLastName);
  };

  const resetFilters = () => {
    setSearchLastName("");
    setBusinessUnitSelected(null);
    setSearchHiringDate(undefined);
    if (user.authRole === Role.RegionalManager) {
      setCountrySelected(null);
    }
  };

  const findByAllParameters = () => {
    const filters = parametersToFilter();
    onSearchEmployees(filters);
  };

  const parametersToFilter = () => {
    return Object.assign(
      {},
      searchLastName && searchLastName !== "" ? { lastName: searchLastName } : null,
      businessUnitSelected ? { businessUnitId: parseInt(businessUnitSelected.value) } : null,
      countrySelected && countrySelected.value !== ""
        ? { countryIso3: countrySelected.value }
        : null,
      searchHiringDate ? { hiringDateFrom: searchHiringDate.format(DATE_FILTER_FORMAT) } : null
    );
  };
  return (
    <FilterPanel
      title="Search Employees"
      findByAllParameters={findByAllParameters}
      resetFilters={resetFilters}
    >
      <Row>
        <Col md="3">
          <InputField
            id="input-last-name"
            label="Last name"
            style={{ height: "36px" }}
            className="form-control"
            value={searchLastName}
            placeholder="Last Name"
            type="text"
            onChange={onChangeSearchLastName}
          />
        </Col>
        <Col md="3">
          <SelectField
            id="select-businessUnits"
            label="Business Unit"
            value={businessUnitSelected}
            options={businessUnits}
            onChange={item => {
              setBusinessUnitSelected(item as SelectOption);
            }}
          />
        </Col>
        <WithAuthorization requires={Permission.Employee_country_all}>
          <Col md="3">
            <SelectField
              id="select-country"
              label="Country"
              value={countrySelected}
              options={countries}
              onChange={item => {
                setCountrySelected(item as SelectOption);
              }}
            />
          </Col>
        </WithAuthorization>
        <Col md="2">
          <DateField
            id="date-hire-from"
            label="Hire Date From"
            value={searchHiringDate}
            setValue={setSearchHiringDate}
          />
        </Col>
        <Col md="1">&nbsp;</Col>
      </Row>
    </FilterPanel>
  );
};
