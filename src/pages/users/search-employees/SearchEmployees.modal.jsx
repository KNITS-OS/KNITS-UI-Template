import moment from "moment";
import { useState } from "react";

import { Button, Col, Modal, ModalBody, ModalFooter, ModalHeader, Row } from "reactstrap";

import { useAppSelector } from "redux/app";
import {
  selectAllGroupsDataAsSelectOptions,
  selectAllRolesDataAsSelectOptions,
} from "redux/features";

import { DateField, SelectField } from "components/widgets";

import { autoOffboardingDate, createOnboardingDate } from "pages/utils";

import { DATE_FILTER_FORMAT } from "variables/app.consts";

import { EmployeeCard } from ".";

export const SearchEmployeesModal = ({
  selectedFlatRows = [],
  toggleAllRowsSelected,
  setIsSuccess,
  setSuccessMessage,
  setSaveSent,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // state to know which fields has the user selected
  const [currentSelections, setCurrentSelections] = useState([]);

  const { onboardingDate } = createOnboardingDate();
  const { defaultOffBoardingDate } = autoOffboardingDate();

  const [offboardingDate, setOffboardingDate] = useState(
    moment(defaultOffBoardingDate, DATE_FILTER_FORMAT)
  );
  const [roleId, setRoleId] = useState();
  const [groups, setGroups] = useState([]);

  const roleOptions = useAppSelector(selectAllRolesDataAsSelectOptions);
  const groupOptions = useAppSelector(selectAllGroupsDataAsSelectOptions);

  const unselectRows = () => {
    if (toggleAllRowsSelected) {
      toggleAllRowsSelected();
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    unselectRows();
    setIsOpen(false);
  };

  const updateMultipleEmployeesAndCareMembers = () => {
    /**
     * this function maps the selected employees to careMembers array
     */
    const createCareMembers = () => {
      const newCareMembers = selectedFlatRows.map(employee => {
        const { id, ...rest } = employee;

        return {
          ...rest,
          roleId,
          groups,
          employeeId: employee.id,
          id: employee.careMemberId !== null ? employee.careMemberId : -1,
          onboardingDate,
          offboardingDate: moment(offboardingDate, DATE_FILTER_FORMAT).format(DATE_FILTER_FORMAT),
          careMember: true,
        };
      });
      const updatedEmployees = selectedFlatRows.map(employee => {
        return {
          ...employee,
          careMember: true,
        };
      });

      console.log("update multible employees", updatedEmployees);
    };

    createCareMembers();

    setSuccessMessage("Successfully created care members");
    setIsSuccess(true);
    setSaveSent(true);

    closeModal();
  };

  return (
    <>
      {alert}
      <>
        <Button
          className="btn btn-primary btn-md h-25"
          color="primary"
          onClick={openModal}
          disabled={selectedFlatRows.length <= 0}
        >
          Invite Care Members
        </Button>
        <Modal isOpen={isOpen} size="lg">
          <ModalHeader
            close={
              <button className="close" onClick={closeModal}>
                ×
              </button>
            }
          >
            Invite Care Members
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col md="5">
                <DateField
                  id="date-auto-offboarding-date"
                  label="Auto Offboard Date"
                  value={offboardingDate}
                  setValue={setOffboardingDate}
                />
              </Col>
              <Col md="7">
                <SelectField
                  id="select-role"
                  label="Role"
                  options={roleOptions}
                  onChange={item => {
                    const { value } = item;
                    setRoleId(parseInt(value));
                  }}
                />
              </Col>
              <Col md="12">
                <SelectField
                  id="select-group"
                  label="Group"
                  options={groupOptions}
                  isMulti={true}
                  isOptionDisabled={option => {
                    const { label } = option;
                    // if user has selected ALL field then other fields will be disabled
                    if (currentSelections.some(selection => selection.label === "ALL")) {
                      return true;
                      // if user has selected other field then ALL field will be disabled
                    } else if (currentSelections.length > 0 && label === "ALL") {
                      return true;
                      // default allow all fields to be selected
                    } else {
                      return false;
                    }
                    // return true to disable field
                  }}
                  onChange={items => {
                    const selections = items;
                    setCurrentSelections(selections);
                    // if there is an "ALL" selection in the list (data will be 1,2,3,12,etc)
                    // split and return an array of numbers
                    if (selections.some(item => item.label === "ALL")) {
                      const values = selections[0].value.split(",").map(Number);
                      setGroups(values);
                    } else {
                      // if user selected groups manually, return an array of the group ids
                      const groupIdsSelected = selections.map(item => parseInt(item.value));
                      setGroups(groupIdsSelected);
                    }
                  }}
                />
              </Col>
              {/* @todo here go the selects to select role and groups and offboarding date */}
            </Row>
            <Row>
              {selectedFlatRows.map(employee => (
                <EmployeeCard employee={employee} />
              ))}
            </Row>
            {/* card will have employee name, group, role and offboarding date */}
            {/* maybe not group, role and offboarding date because they will be at the top anyways */}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={updateMultipleEmployeesAndCareMembers}>
              Invite
            </Button>
            <Button onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    </>
  );
};
