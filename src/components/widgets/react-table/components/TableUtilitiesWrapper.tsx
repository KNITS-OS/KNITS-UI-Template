import { cloneElement } from "react";
import { Row } from "react-table";

export const TableUtilitiesWrapper = <T,>({
  children,
  selectedFlatRows,
  toggleAllRowsSelected,
}) => {
  const selectedEntities = selectedFlatRows.map(row => row.original);
  return (
    <>{cloneElement(children, { selectedFlatRows: selectedEntities, toggleAllRowsSelected })}</>
  );
};
