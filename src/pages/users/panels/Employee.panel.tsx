import { observer } from "mobx-react-lite";
import moment, { Moment } from "moment";
import { useEffect, useState } from "react";

import { Button, Col, Form, Row, Spinner } from "reactstrap";

import { useStores } from "mobx/app";

import { DateField, InputField, SelectField } from "components/widgets";

import { selectGroupsByIdsAsSelectValues } from "pages/utils";

import { Employee, SelectOption } from "types";
import { DATE_FILTER_FORMAT } from "variables/app.consts";

interface onSaveFunction {
  (updatedEmployee: Employee): void;
}

interface Props {
  groupOptions: SelectOption[];
  onSave: onSaveFunction;
}

export const EmployeePanel = observer(({ groupOptions, onSave }: Props) => {
  const { employeeStore, groupStore } = useStores();

  const { entity: employee } = employeeStore;

  const [onboardingDate, setOnboardingDate] = useState<Moment | undefined>(
    moment(employee.onboardingDate, DATE_FILTER_FORMAT)
  );

  const [offboardingDate, setOffboardingDate] = useState<Moment | undefined>(
    moment(employee.offboardingDate, DATE_FILTER_FORMAT)
  );

  // state to know which group fields has the user selected
  const [currentGroupSelections, setCurrentGroupSelections] = useState<SelectOption[]>(
    selectGroupsByIdsAsSelectValues(employee.groups, groupStore.entities)
  );

  useEffect(() => {
    setOnboardingDate(moment(employee.onboardingDate, DATE_FILTER_FORMAT));
    setOffboardingDate(moment(employee.offboardingDate, DATE_FILTER_FORMAT));
  }, [employee.onboardingDate, employee.offboardingDate]);

  const onSaveEmployee = () => {
    const newEmployee: Employee = {
      ...employee,
      onboardingDate: moment(onboardingDate, DATE_FILTER_FORMAT).format(DATE_FILTER_FORMAT),
      offboardingDate: moment(offboardingDate, DATE_FILTER_FORMAT).format(DATE_FILTER_FORMAT),
    };

    onSave(newEmployee);
  };

  if (employeeStore.isLoading) {
    return (
      <div className="text-center">
        <Spinner />
      </div>
    );
  }

  return (
    <Form>
      <h6 className="heading-small text-muted mb-4">User information</h6>
      <div className="pl-lg-4">
        <Row>
          <Col lg="6">
            <DateField
              id="date-auto-onboarding-date"
              label="Onboard date"
              value={onboardingDate}
              setValue={setOnboardingDate}
            />
          </Col>
          <Col lg="6">
            <DateField
              id="date-auto-offboarding-date"
              label="Auto Offboard Date"
              value={offboardingDate}
              setValue={setOffboardingDate}
            />
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <SelectField
              id="select-group"
              label="Group"
              options={groupOptions}
              value={selectGroupsByIdsAsSelectValues(employee.groups, groupStore.entities)}
              isMulti={true}
              isOptionDisabled={option => {
                const { label } = option as SelectOption;
                // if user has selected ALL field then other fields will be disabled
                if (currentGroupSelections.some(selection => selection.label === "ALL")) {
                  return true;
                  // if user has selected other field then ALL field will be disabled
                } else if (currentGroupSelections.length > 0 && label === "ALL") {
                  return true;
                  // default allow all fields to be selected
                } else {
                  return false;
                }
                // return true to disable field
              }}
              onChange={items => {
                const selections = items as SelectOption[];
                setCurrentGroupSelections(selections);
                // if there is an "ALL" selection in the list (data will be 1,2,3,12,etc)
                // split and return an array of numbers
                if (selections.some(item => item.label === "ALL")) {
                  const values = selections[0].value.split(",").map(Number);
                  employeeStore.updateEmployeeState({ name: "groups", value: values });
                } else {
                  // if user selected groups manually, return an array of the group ids
                  const groupIdsSelected = selections.map(item => parseInt(item.value));
                  employeeStore.updateEmployeeState({ name: "groups", value: groupIdsSelected });
                }
              }}
            />
          </Col>
        </Row>
      </div>
      <hr className="my-4" />

      <h6 className="heading-small text-muted mb-4">User information</h6>
      <div className="pl-lg-4">
        <Row>
          <Col lg="6">
            <InputField
              id="input-last-name"
              label="Last name"
              value={employee.lastName}
              type="text"
              disabled={true}
            />
          </Col>
          <Col lg="6">
            <InputField
              id="input-first-name"
              label="First name"
              value={employee.firstName}
              type="text"
              disabled={true}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="6">
            <InputField
              id="input-international-name"
              label="International Name"
              value={employee.internationalName}
              type="text"
              disabled={true}
            />
          </Col>
          <Col lg="6">
            <InputField
              id="input-email"
              label="Email address"
              value={employee.email}
              type="text"
              disabled={true}
            />
          </Col>
        </Row>
      </div>
      <hr className="my-4" />

      <h6 className="heading-small text-muted mb-4">Office information</h6>
      <div className="pl-lg-4">
        <Row>
          <Col md="12">
            <InputField
              id="input-office-address-street"
              label="Street"
              value={employee.office.street}
              type="text"
              disabled={true}
            />
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <InputField
              id="input-office-address-city"
              label="City"
              value={employee.office.city}
              type="text"
              disabled={true}
            />
          </Col>
          <Col lg="4">
            <InputField
              id="input-office-address-country"
              label="Country"
              value={employee.office.country || ""}
              type="text"
              disabled={true}
            />
          </Col>
          <Col lg="4">
            <InputField
              id="input-office-address-postal-code"
              label="Postal Code"
              value={employee.office.postalCode || ""}
              type="text"
              disabled={true}
            />
          </Col>
        </Row>
      </div>
      <hr className="my-4" />

      <h6 className="heading-small text-muted mb-4">Company Data</h6>
      <div className="pl-lg-4">
        <Row>
          <Col lg="4">
            <InputField
              id="input-title"
              label="Job Title"
              value={employee.title}
              type="text"
              disabled={true}
            />
          </Col>

          <Col lg="4">
            <InputField
              id="input-companyPhone"
              label="Company Phone"
              value={employee.companyPhone}
              type="text"
              disabled={true}
            />
          </Col>
          <Col lg="4">
            <InputField
              id="input-company-code"
              label="Company Code"
              value={employee.companyCode}
              type="text"
              disabled={true}
            />
          </Col>
        </Row>

        <Row>
          <Col lg="4">
            <InputField
              id="input-business-unit"
              label="Business Unit"
              value={employee.businessUnit}
              type="text"
              disabled={true}
            />
          </Col>

          <Col lg="4">
            <InputField
              id="input-cost-center"
              label="Cost Center"
              value={employee.costCenter}
              type="text"
              disabled={true}
            />
          </Col>
          <Col lg="4">
            <InputField
              id="input-management-group"
              label="Management Group"
              value={employee.managementGroup}
              type="text"
              disabled={true}
            />
          </Col>
        </Row>
        <Row>
          <Button color="primary" type="button" onClick={onSaveEmployee}>
            Update Employee
          </Button>
        </Row>
      </div>
    </Form>
  );
});
