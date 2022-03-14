import { Row } from "react-table";

import { Button } from "reactstrap";

export const SelectionButton = <T,>({ selectButtonText, selectedFlatRows }) => {
  const selectedEntities = selectedFlatRows.map(row => row.original);
  return (
    <>
      {selectButtonText && (
        <>
          <Button
            className="btn btn-success btn-md h-25"
            onClick={() => console.log("selectedRows", selectedEntities)}
          >
            {selectButtonText}
          </Button>
        </>
      )}
    </>
  );
};
