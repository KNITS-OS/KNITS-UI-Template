import { TwoMouseEventActionButtons } from "components/widgets";

export const groupsTableColumns = ({ onDetailsButtonClick, onRemoveButtonClick }) => {
  return [
    {
      accessor: "id",
      Header: "id",
    },
    {
      accessor: "name",
      Header: "Name",
    },
    {
      accessor: "description",
      Header: "description",
    },
    {
      accessor: "active",
      Header: "active",
    },
    TwoMouseEventActionButtons({ onDetailsButtonClick, onRemoveButtonClick }),
  ];
};
