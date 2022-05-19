import { TwoMouseEventActionButtons, IDefaultActionButtons } from "components/widgets";

export const employeesTableColumns = ({
  onDetailsButtonClick,
  onRemoveButtonClick,
}: IDefaultActionButtons) => {
  return [
    {
      accessor: "id",
      Header: "id",
    },
    {
      accessor: "due_date",
      Header: "Due",
    },
    {
      accessor: "status",
      Header: "Status",
    },
    {
      accessor: "title",
      Header: "Work Order Title",
    },
    {
      accessor: "priority",
      Header: "Priority",
    },
    {
      accessor: "assignee",
      Header: "Assignee(s)",
    },
    {
      accessor: "location",
      Header: "Location Name",
    },
    {
      accessor: "asset",
      Header: "Asset",
    },
    {
      accessor: "last_updated",
      Header: "Last Updated",
    },
    {
      accessor: "created_on",
      Header: "Created On",
    },
    TwoMouseEventActionButtons({ onDetailsButtonClick, onRemoveButtonClick }),
  ];
};
