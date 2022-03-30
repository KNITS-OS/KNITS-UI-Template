import { Moment } from "moment";
import { useEffect, useState } from "react";

import { Col, Row } from "reactstrap";

import { FilterPanel } from "components/panels";
import { DateField, InputField, SelectField } from "components/widgets";

import {
  selectAllBusinessUnitsDataAsSelectOptions,
  selectAllCountriesDataAsSelectOptions,
  selectAllGroupsDataAsSelectOptions,
} from "pages/utils";

import { AdvancedEmployeeQueryFilters, Employee, SelectOption } from "types";
import { DATE_FILTER_FORMAT } from "variables/app.consts";

interface Props {
  setFilters: (filters: AdvancedEmployeeQueryFilters) => void;
  currentGroupMembers?: Employee[];
}

export const SearchAdvancedEmployeesFilterPanel = ({ setFilters, currentGroupMembers }: Props) => {
  const [businessUnitOptions] = useState(selectAllBusinessUnitsDataAsSelectOptions());
  const [countryOptions] = useState(selectAllCountriesDataAsSelectOptions());
  const [groupOptions, setGroupOptions] = useState<SelectOption[]>([]);

  const [searchLastName, setSearchLastName] = useState("");
  const [searchOnBoardDateFrom, setSearchOnBoardDateFrom] = useState<Moment | undefined>(undefined);
  const [searchOnBoardDateTo, setSearchOnBoardDateTo] = useState<Moment | undefined>(undefined);
  const [searchOffboardingDateFrom, setSearchOffboardingDateFrom] = useState<Moment | undefined>(
    undefined
  );
  const [searchOffboardingDateTo, setSearchOffboardingDateTo] = useState<Moment | undefined>(
    undefined
  );

  const [businessUnitSelected, setBusinessUnitSelected] = useState<SelectOption | null>();
  const [groupSelected, setGroupSelected] = useState<SelectOption | null>();
  const [countrySelected, setCountrySelected] = useState<SelectOption | null>();
  const [groupMembers, setGroupMembers] = useState(
    currentGroupMembers?.map(member => member.id) || []
  );

  useEffect(() => {
    const getData = async () => {
      const groups = await selectAllGroupsDataAsSelectOptions();
      setGroupOptions(groups);
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setGroupMembers(currentGroupMembers?.map(member => member.id) || []);
  }, [currentGroupMembers]);

  const resetFilters = () => {
    setSearchLastName("");
    setSearchOnBoardDateFrom(undefined);
    setSearchOnBoardDateTo(undefined);
    setSearchOffboardingDateFrom(undefined);
    setSearchOffboardingDateTo(undefined);
    setBusinessUnitSelected(null);
    setGroupSelected(null);
  };

  const findByAllParameters = () => {
    const filters = parametersToFilter();

    setFilters(filters);
  };

  const parametersToFilter = () => {
    return Object.assign(
      {},
      searchLastName && searchLastName !== "" ? { lastName: searchLastName } : null,
      groupSelected ? { groupId: parseInt(groupSelected.value) } : null,
      businessUnitSelected ? { businessUnit: businessUnitSelected.label } : null,
      countrySelected && countrySelected.value !== ""
        ? { "office.countryiso3": countrySelected.value }
        : null,
      searchOnBoardDateFrom
        ? { onboardDateFrom: searchOnBoardDateFrom.format(DATE_FILTER_FORMAT) }
        : null,
      searchOnBoardDateTo
        ? { onboardDateTo: searchOnBoardDateTo.format(DATE_FILTER_FORMAT) }
        : null,
      searchOffboardingDateFrom
        ? { offboardingDateFrom: searchOffboardingDateFrom.format(DATE_FILTER_FORMAT) }
        : null,
      searchOffboardingDateTo
        ? { offboardingDateTo: searchOffboardingDateTo.format(DATE_FILTER_FORMAT) }
        : null,
      groupMembers ? { members: groupMembers } : null
    );
  };

  return (
    <FilterPanel
      title="Search Employees"
      findByAllParameters={findByAllParameters}
      resetFilters={resetFilters}
    >
      <Row>
        <Col md="2">
          <SelectField
            id="select-businessUnits"
            label="Business Unit"
            value={businessUnitSelected}
            options={businessUnitOptions}
            onChange={item => {
              setBusinessUnitSelected(item as SelectOption);
            }}
          />
        </Col>
        <Col md="3">
          <SelectField
            id="select-country"
            label="Country"
            value={countrySelected}
            options={countryOptions}
            onChange={item => {
              setCountrySelected(item as SelectOption);
            }}
          />
        </Col>

        <Col md="3">
          <SelectField
            id="select-group"
            label="Group"
            value={groupSelected}
            options={groupOptions}
            onChange={item => {
              setGroupSelected(item as SelectOption);
            }}
          />
        </Col>
        <Col md="3">
          <InputField
            id="input-last-name"
            label="Last name"
            style={{ height: "36px" }}
            className="form-control"
            value={searchLastName}
            placeholder="Last Name"
            type="text"
            onChange={e => {
              setSearchLastName(e.currentTarget.value);
            }}
          />
        </Col>
        <Col md="2">
          <DateField
            id="date-onboarding-from"
            inputProps={{
              placeholder: "From",
            }}
            value={searchOnBoardDateFrom}
            setValue={setSearchOnBoardDateFrom}
            label="Onboarding from"
          />
        </Col>
        <Col md="2">
          <DateField
            id="date-onboarding-to"
            inputProps={{
              placeholder: "To",
            }}
            value={searchOnBoardDateTo}
            setValue={setSearchOnBoardDateTo}
            label="Onboarding to"
          />
        </Col>
        <Col md="2">
          <DateField
            id="date-offboarded-from"
            inputProps={{
              placeholder: "From",
            }}
            label="Offboarded From"
            value={searchOffboardingDateFrom}
            setValue={setSearchOffboardingDateFrom}
          />
        </Col>
        <Col md="2">
          <DateField
            id="date-offboarded-to"
            inputProps={{
              placeholder: "To",
            }}
            label="Offboarded To"
            value={searchOffboardingDateTo}
            setValue={setSearchOffboardingDateTo}
          />
        </Col>
      </Row>
    </FilterPanel>
  );
};
