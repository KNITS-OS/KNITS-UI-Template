import { useState } from "react";

import { Col, Row } from "reactstrap";

import { FilterPanel } from "components/panels";
import { DateField, InputField, SelectField } from "components/widgets";

import { DATE_FILTER_FORMAT } from "variables/app.consts";

export const SearchEmployeesFilterPanel = ({ businessUnits, countries, onSearchEmployees }) => {
  const [searchLastName, setSearchLastName] = useState("");

  const [businessUnitSelected, setBusinessUnitSelected] = useState();
  const [countrySelected, setCountrySelected] = useState();

  const [searchHiringDate, setSearchHiringDate] = useState();

  const onChangeSearchLastName = e => {
    const searchLastName = e.target.value;
    setSearchLastName(searchLastName);
  };

  const resetFilters = () => {
    setSearchLastName("");
    setBusinessUnitSelected(null);
    setSearchHiringDate(undefined);
    setCountrySelected(null);
  };

  const findByAllParameters = () => {
    const filters = parametersToFilter();
    onSearchEmployees(filters);
  };

  const parametersToFilter = () => {
    return Object.assign(
      {},
      searchLastName && searchLastName !== "" ? { lastName: searchLastName } : null,
      businessUnitSelected ? { businessUnit: businessUnitSelected.label } : null,
      countrySelected && countrySelected.value !== ""
        ? { "office.countryiso3": countrySelected.value }
        : null,
      searchHiringDate ? { startDate: searchHiringDate.format(DATE_FILTER_FORMAT) } : null
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
              setBusinessUnitSelected(item);
            }}
          />
        </Col>
        <Col md="3">
          <SelectField
            id="select-country"
            label="Country"
            value={countrySelected}
            options={countries}
            onChange={item => {
              setCountrySelected(item);
            }}
          />
        </Col>
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
